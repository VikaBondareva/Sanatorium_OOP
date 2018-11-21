const authService = require('../services/auth.service');

module.exports={
    login,
    register,
    getCurrent
    
}

function login(req, res, next){
    authService.authenticate(req.body)
        .then(user=>user? res.json(user): res.status(400).json({message: 'Email  or password is incorrect'}))
        .catch(err=> next(err))
}

function register(req,res,next){
    authService.create(req.body)
        .then(()=> res.json({}))
        .catch(err=> next(err))
}

function getCurrent(req, res, next){
    authService.getById(req.user.sub)
        .then(yser=> user? res.json(user): res.sendStatus(404))
        .catch(err=> next(err))
}





//const {User} = require('../models/user-model')
//const jwt = require('jsonwebtoken')
//const config = require('../config/config')
//
//function iwtSignUser(user){
//    const ONE_WEEK = 60*60*24*7
//    return jwt.sign(user, config.authentication.iwtSecret,{
//        expiresIn: ONE_WEEK
//    })
//}
//
//module.exports= {
//    async register(req,res){
//        try{
//            const user = await User.insert(req.body)
//            const userJson =User.toJSON()
//            res.send({
//                user: userJson,
//                token: jwtSignUser(userJson)
//            })
//        } catch (error){
//            res.status(400).send({
//                error: 'This email account is alredy in use'
//            })
//        }
//    },
//    async login(req, res){
//        try{
//            const {email, password} = req.body
//            const user = await User.findOne({
//                email: email
//            })
//            if(!user){
//                return res.status(403).send({
//                    error: 'The login inform was incorrect'
//                })
//            }
//            if(password===user.password){
//                const userJson = user.toJSON()
//                res.send({
//                    user: userJson,
//                    token: jwtSignUser(userJson)
//                })
//            }
//            else {
//                return res.status(403).send({
//                    error: 'The login inform was incorrect'
//                })
//            }
//            
//        } catch(err){
//            res.status(500).send({
//                error: 'An error has occured trying to log in'
//            })
//        }
//    }
//}



