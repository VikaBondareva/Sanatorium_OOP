const authService = require('../services/auth.service');

module.exports={
    login,
    register,
    getById,
    _delete,
    getAll, 
    logout
}

function login(req, res, next){
    authService.authenticate(req.body)
        .then(user=>user? res.json(user): res.status(400).json({message: 'Email  or password is incorrect'}))
        .catch(err=> next(err))
}

function logout(req,res,next){
    authService.logout(req.userId)
        .then(()=> res.json({message: 'Logout was success'}))
        .catch(err=>next(err))
}

function register(req,res,next){
    authService.create(req.body)
        .then(()=> res.json({message: 'Registation was success'}))
        .catch(err=>next(err))
}

function  refreshToken(req,res,next) {
    authService.refreshToken(req.body)
        .then(()=> res.json({message: 'refreshToken'}))
        .catch(err=>next(err))
}



function getAll(req, res, next) {
    authService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next){
    authService.getById(req.params.id)
        .then(user=>user? res.json(user): res.sendStatus(404))
        .catch(err=>next(err))
}

function _delete(req, res, next) {
    authService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
