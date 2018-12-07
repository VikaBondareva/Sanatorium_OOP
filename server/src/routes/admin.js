const AdminController = require('../controllers/AdminController.js')
const authJwt = require('../_helpers/middleware')
const express = require('express')
const router = express.Router()
module.exports = router;

router.put('/api/orders/:id',[authJwt.checkToken, authJwt.isAdmin], AdminController.changeStatusOrder);
router.delete('/api/orders/:id',[authJwt.checkToken, authJwt.isAdmin], AdminController.removeOrder);
router.get('/api/orders',[authJwt.checkToken, authJwt.isAdmin], AdminController.getAllOrder);
router.get('/api/statuts',[authJwt.checkToken, authJwt.isAdmin], AdminController.getStatuts );

router.get('/api/orders/register', [authJwt.checkToken, authJwt.isAdmin], AdminController.getOrderWithReqisterStatus);
router.get('/api/orders/active',[authJwt.checkToken, authJwt.isAdmin], AdminController.getOrdersActive)

router.put('/api/cards/:id', [authJwt.checkToken, authJwt.isAdmin], AdminController.changeStatusCard);
router.get('/api/cards', [authJwt.checkToken, authJwt.isAdmin], AdminController.getAllCards);
router.post('/api/services',[authJwt.checkToken,authJwt.isAdmin], AdminController.addService);
router.post('/api/services/types', [authJwt.checkToken, authJwt.isAdmin], AdminController.addTypeService);
router.put('/api/services/:id', [authJwt.checkToken,authJwt.isAdmin], AdminController.updateService);
router.delete('/api/services/:id', [authJwt.checkToken,authJwt.isAdmin], AdminController._deleteService);


// router.delete('/api/users/:id', authJwt.checkToken, AuthenticationController._delete);
// router.get('/api/users',[authJwt.checkToken, authJwt.isAdmin], AuthenticationController.getAll);
