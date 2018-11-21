const expressJwt = require('express-jwt');
const config = require('../config/config');
const authSevice = require('../services/auth.service');

module.exports=jwt;

function jwt(){
    const secret = config.authentication.jwtSecret;
    return expressJwt({secret, isRevoked}).unless({
        path:[
            '/api/login',
            'api/register'
        ]
    });
}



async function isRevoked(req, payload, done){
    const user= await authSevice.getById(payload.sub);
    
    if(!user){
        return done(null, false)
    }
    
    done();
}