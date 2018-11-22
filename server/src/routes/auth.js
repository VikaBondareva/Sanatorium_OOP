//const {User} = require('../models/user-model')
const AuthenticationController = require('../controllers/AuthenticationController')
const authJwt = require('../_helpers/middleware')
//const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const express = require('express')
const router = express.Router()
//const isAuthenticated = require('../policies/isAuthenticated')
//
module.exports = router;

router.post('/api/login', AuthenticationController.login);
router.post('/api/register', AuthenticationController.register);
router.get('/api/users/current', authJwt.checkToken, AuthenticationController.getCurrent);
router.delete('/api/users/:id', authJwt.checkToken, AuthenticationController._delete);
router.get('/api/users', AuthenticationController.getAll);
router.get('/api/users/:id', authJwt.checkToken, AuthenticationController.getById);
