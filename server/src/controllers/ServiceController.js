const serviceService = require('../services/service.service')

module.exports = {
    addService,
    update,
    getAllServices,
    getByOneService,
    _delete,
    sortServicesOnTypes,
    addType
};


function addService(req, res, next) {

    serviceService.create(req.body)
        // .then(service=>service? res.json(service): res.status(400).json({message: 'Bad request'}))
        .then(() => res.json({}))
        .catch(err => next(err));
}

function addType(req,res,next){
    serviceService.addType(req.body)
        .then(()=>res.json({message: "Type succesfully saved"}))
        .catch(err => next(err));
}

function getAllServices(req, res, next) {
    serviceService.getAllServices()
        .then(services=>services? res.json(services): res.sendStatus(404))
        .catch(err => next(err));
}

function getByOneService(req, res, next){
    serviceService.getByOneService(req.params.id)
        .then(service=>service? res.json(service): res.sendStatus(404))
        .catch(err=>next(err))
}

function _delete(req, res, next) {
    serviceService._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    serviceService.update(req.params.id)
        .then(()=>res.json({message: "Service succesfully updated"}))
        .catch(err => next(err));
}

function sortServicesOnTypes(req, res, next){
    serviceService.sortServicesOnTypes()
        .then(services => services ? res.json(services) : res.sendStatus(404))
        .catch(err => next(err))
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



