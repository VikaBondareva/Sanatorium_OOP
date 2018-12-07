const ServiceController = require('../controllers/ServiceController')

const express = require('express')
const router = express.Router()


module.exports = router;

router.get('/api/services', ServiceController.getAllServices);
router.get('/api/services/:id', ServiceController.getByOneService);
