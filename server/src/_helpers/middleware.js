const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../_helpers/db');
const User = db.User;
const Roles=db.Roles;

const checkToken = (req,res,next) =>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token.startsWith('Bearer')){
        token = token.slice(7, token.length);
    }
    if(token){
        jwt.verify(token, config.jwt.secret, (err,data)=>{
            if(err){
                return res.status(401).json({
                    success: false,
                    message:  'Token is not valid'
                })
            } else {
                req.userId=data.userId
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

const checkRefreshToken = (req,res,next)=>{
    
    let token = req.headers['refresh-token'];
    if(token.startsWith('Bearer')){
        token = token.slice(7, token.length);
    }
    try{
        const payload = jwt.verify(token, config.jwt.secret);
        if(payload.type !== 'refresh'){
            return res.status(401).json({success:false, messsage: 'invalid token, not refresh'});
        } else {
            req.refreshToken = payload.id;
            next();
        }
        
    } catch(e){
        if(e instanceof jwt.TokenExpiredError){
            return res.status(401).json({success:false, messsage: 'Token expired'});
        }
        if(e instanceof jwt.JsonWebTokenError){
            return res.status(401).json({success:false, messsage: 'invalid token, jwt'});
        }
    }
}

const isAdmin = (req,res,next)=>{
    User.findOne({_id: req.userId})
        .exec((err, user)=>{
            if(err){
                if(err.kind === 'sub'){
                   return res.status(404).send({
					   message: "User not found with email = " + req.body.email
				    });     
                }
                return res.status(500).send({
				    message: "Error retrieving User with email = " + req.body.email
			     });
            } else {
                Roles.findById(user.role, (err, role)=>{
                    if(err)
                        res.status(500).send("Error -> " + err);
                    if(role.name==="ADMIN"){
                        next();
					    return;
                    }
                    res.status(403).send("Require Admin Role!");
			         return;
                })
            }
        })
}

const authJwt ={};
authJwt.isAdmin = isAdmin;
authJwt.checkToken = checkToken;
authJwt.checkRefreshToken = checkRefreshToken;

module.exports = authJwt;