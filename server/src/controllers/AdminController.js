const adminService = require('../services/admin.service.js');

module.exports={
    changeStatusOrder,
    changeStatusCard,
    getAllCards,
    addService,
    updateService,
    addTypeService,
    _deleteService,
    removeOrder,
    editTypeName,
    getAllOrder
}


function changeStatusOrder(req,res,next){
    adminService.changeStatusOrder(req.params.id,req.body)
        .then(()=>res.json({message: "Status order change succesfully"}))
        .catch(err=>next(err))
}

function getAllOrder(req,res,next){
     adminService.getAllOrder()
        .then(orders=>orders? res.json(orders): res.status(400).json({message: 'Invalid'}))
        .catch(err=>next(err))
}

function removeOrder(req,res,next){
    adminService.removeOrder(req.params.id)
        .then(()=>res.json({message: "Order succesfully delete"}))
        .catch(err => next(err));    
}


function changeStatusCard(req,res,next){
    adminService.changeStatusCard(req.params.id,req.body)
        .then(()=>res.json({message: "Status card change succesfully"}))
        .catch(err=>next(err))
}

function getAllCards(req,res,next){
     adminService.getAllCards()
        .then(cards=>cards? res.json(cards): res.status(400).json({message: 'Invalid'}))
        .catch(err=>next(err))
}


function addService(req, res, next) {

    adminService.createService(req.body)
        .then(() => res.json({message: "Service succesfully saved"}))
        .catch(err => next(err));
}

function _deleteService(req, res, next) {
    adminService._deleteService(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateService(req, res, next) {
    adminService.updateService(req.params.id)
        .then(()=>res.json({message: "Service succesfully updated"}))
        .catch(err => next(err));
}


function addTypeService(req,res,next){
    adminService.addTypeService(req.body)
        .then(()=>res.json({message: "Type succesfully saved"}))
        .catch(err => next(err));
}

function editTypeName(req,res,next){
    adminService.editTypeName(req.params.id, req.body)
        .then(()=>res.json({message: "Type succesfully edit"}))
        .catch(err => next(err));    
}








