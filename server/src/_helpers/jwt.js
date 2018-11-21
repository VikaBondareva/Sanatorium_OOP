const expressJwt = require('expess-jwt');
const congig = require('../config/config');
const authSevice = require('../services/auth.service');

modulle.exports=jwt;

function jwt(){
    const secret = config.authentication.jwtSecret;
    return expressJwt({secret, isRevored}).unless({
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