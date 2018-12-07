const serviceService = require('../services/service.service')

module.exports = {
    getAllServices,
    getByOneService
};


function getAllServices(req, res, next) {
    serviceService.getAllServices()
        .then(services=>services? res.json(services): res.sendStatus(404))
        .catch(err => next(err));
}

function getByOneService(req, res, next){
    serviceService.getByOneService(req.params.id)
        .then(service=>service? res.json(service): res.sendStatus(404))
        .catch(err=>next(err))
}

