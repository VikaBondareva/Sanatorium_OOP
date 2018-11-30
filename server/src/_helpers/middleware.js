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
        jwt.verify(token, config.authentication.secret, (err,data)=>{
            if(err){
                return res.json({
                    success: false,
                    message: token+' Token is not valid'
                })
            } else {
                req.userId=data.sub
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

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
                Roles.find({
                    '_id': {$in : user.roles}
                }, (err, roles)=>{
                    if(err)
                        res.status(500).send("Error -> " + err);
                    
                    for(let i=0; i<roles.length; i++){
                        if(roles[i]._id==1){
                            next();
					       return;
                        }
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

module.exports = authJwt;