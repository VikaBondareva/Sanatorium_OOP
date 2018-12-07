const UserController = require('../controllers/UserController')
const authJwt = require('../_helpers/middleware')
const express = require('express')
const router = express.Router()

module.exports = router;

router.get('/api/users/current', authJwt.checkToken, UserController.getCurrent);
router.put('/api/users', authJwt.checkToken, UserController.update);
router.post('/api/user/cards', authJwt.checkToken, UserController.createCard);
router.post('/api/user/orders', authJwt.checkToken, UserController.orderService);
router.delete('/api/user/orders/:id', authJwt.checkToken, UserController.deleteOrder);
router.get('/api/user/cards', authJwt.checkToken, UserController.getCardsUser);
router.get('/api/user/orders', authJwt.checkToken, UserController.getOrdersUser);
router.put('/api/user/orders/:id', authJwt.checkToken, UserController.changeOrderDate);
router.get('/api/user/cards/current', authJwt.checkToken, UserController.getFullCurrentCardUser);