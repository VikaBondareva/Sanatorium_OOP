const ServiceController = require('../controllers/ServiceController')
const authJwt = require('../_helpers/middleware')
const express = require('express')
const router = express.Router()


module.exports = router;

router.get('/api/services', ServiceController.getAllServices);
router.get('/api/services/:id',[authJwt.checkToken, authJwt.isAdmin],  ServiceController.getByOneService);
router.get('/api/schedules',[authJwt.checkToken, authJwt.isAdmin],  ServiceController.getSchedules);