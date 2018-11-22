const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../_helpers/db');
const User = db.User;
const Roles=db.Roles;

const checkToken = (req,res,next) =>{
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token.startsWith('Baerer ')){
        token = token.slice(7, token.length)
    }
    
    if(token){
        jwt.verify(token, config.authentication.secret, (err,decoded)=>{
            if(err){
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                })
            } else {
                res.decoded = decoded;
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
    User.findOne({_id: req.id})
        .exec((err, user)=>{
            if(err){
                if(err.kind === 'ObjectId'){
                   return res.status(404).send({
					   message: "User not found with Username = " + req.body.email
				    });     
                }
                return res.status(500).send({
				    message: "Error retrieving User with Username = " + req.body.email
			     });
            } else {
                Roles.find({
                    '_id': {$in : user.roles}
                }, (err, roles)=>{
                    if(err)
                        res.status(500).send("Error -> " + err);
                    
                    for(let i=0; i<roles.length; i++){
                        if(roles[i].name.toUpperCase()==="ADMIN"){
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