const ServiceController = require('../controllers/ServiceController')
const express = require('express')
const router= express.Router()


module.exports = router;

    router.post('/api/services', ServiceController.addService);
    router.get('/api/services/sort', ServiceController.sortServicesOnTypes);

    router.put('/api/services/:id', ServiceController.update);
    router.delete('/api/services/:id', ServiceController._delete);
    router.get('/api/services', ServiceController.getAllServices);
    router.get('/api/services/:id', ServiceController.getByOneService);


