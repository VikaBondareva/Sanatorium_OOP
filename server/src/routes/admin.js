const AdminController = require('../controllers/AdminController.js')
const authJwt = require('../_helpers/middleware')
const express = require('express')
const router = express.Router()
module.exports = router;

router.put('/api/orders/:id',[authJwt.checkToken, authJwt.isAdmin], AdminController.changeStatusOrder);
router.put('api/cards/:id', [authJwt.checkToken, authJwt.isAdmin], AdminController.changeStatusCard);
// router.delete('/api/users/:id', authJwt.checkToken, AuthenticationController._delete);
// router.get('/api/users',[authJwt.checkToken, authJwt.isAdmin], AuthenticationController.getAll);
