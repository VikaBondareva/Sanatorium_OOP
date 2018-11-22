const UserController = require('../controllers/UserController')
const authJwt = require('../_helpers/middleware')
const express = require('express')
const router = express.Router()

module.exports = router;

router.put('/api/users/:id', authJwt.checkToken, UserController.update);
