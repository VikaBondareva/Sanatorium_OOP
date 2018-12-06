const AuthenticationController = require('../controllers/AuthenticationController')
const authJwt = require('../_helpers/middleware')
const express = require('express')
const router = express.Router()
module.exports = router;

router.post('/api/auth/login', AuthenticationController.login);
router.post('/api/auth/register', AuthenticationController.register);
router.post('/api/auth/logout', authJwt.checkToken, AuthenticationController.logout);

router.post('/api/auth/refresh-token',authJwt.checkRefreshToken,AuthenticationController.refreshTokens);
// router.post('api/auth/refesh-token',authJwt.checkToken, AuthenticationController.refreshToken );

// router.delete('/api/users/:id', authJwt.checkToken, AuthenticationController._delete);
router.get('/api/users',[authJwt.checkToken, authJwt.isAdmin], AuthenticationController.getAll);
router.get('/api/users/:id', authJwt.checkToken, AuthenticationController.getById);
