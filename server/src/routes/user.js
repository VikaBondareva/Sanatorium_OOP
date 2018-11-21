//const {User} = require('../models/user-model')
const UserController = require('../controllers/UserController')
const express = require('express')
const router= express.Router()
//
module.exports = router;

    router.put('/api/users/:id', UserController.update);
