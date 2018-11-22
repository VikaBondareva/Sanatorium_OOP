const ServiceController = require('../controllers/ServiceController')
const authJwt = require('../_helpers/middleware')

const express = require('express')
const router = express.Router()


module.exports = router;

router.post('/api/services',[authJwt.checkToken,authJwt.isAdmin], ServiceController.addService);
router.get('/api/services/sort', ServiceController.sortServicesOnTypes);

router.put('/api/services/:id', [authJwt.checkToken,authJwt.isAdmin], ServiceController.update);
router.delete('/api/services/:id', [authJwt.checkToken,authJwt.isAdmin], ServiceController._delete);
router.get('/api/services', ServiceController.getAllServices);
router.get('/api/services/:id', ServiceController.getByOneService);
