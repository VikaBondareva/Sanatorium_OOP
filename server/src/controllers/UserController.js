const userService = require('../services/user.service');

module.exports={
    update,
    createCard,
    getCurrent,
    orderService,
    deleteOrder,
    getFullCurrentCardUser,
    getCardsUser,
    getOrdersUser,
    changeOrderDate
}

function changeOrderDate(req, res, next){
    userService.changeOrderDate(req.params.id, req.body)
        .then(()=>res.json({message: "User saved"}))
        .catch(err=> next(err))
}

function getCurrent(req, res, next){
    userService.getById(req.userId)
        .then(user=> user? res.json(user): res.sendStatus(404))
        .catch(err=> next(err))
}
function update(req,res,next){
    userService.update(req.userId,req.body)
        .then(()=>res.json({message: "User update"}))
        .catch(err=>next(err))
}

function createCard(req,res,next){
	userService.createCard(req.userId,req.body)
		.then(()=>res.json({message: "Card saved"}))
        .catch(err=>next(err))
}

function orderService(req,res,next){
	userService.orderService(req.body,req.userId,)
		.then(response=>!response? res.json({message: "Order register"}): res.status(400).json({message: response}) )
        .catch(err=>next(err))
}

function deleteOrder(req,res,next){
	userService.deleteOrder(req.params.id)
		.then(()=>res.json({message: "Order delete"}))
        .catch(err=>next(err))
}

function getFullCurrentCardUser(req,res,next){
	userService.getFullCurrentCardUser(req.userId)
		.then(cards=>cards? res.json(cards): res.status(400).json({message: 'Invalid'}))
        .catch(err=>next(err))
}
function getCardsUser(req,res,next){
	userService.getCardsUser(req.userId)
		.then(card=>card? res.json(card): res.status(400).json({message: 'Invalid'}))
        .catch(err=>next(err))
}

function getOrdersUser(req,res,next){
	userService.getOrdersUser(req.userId)
		.then(orders=>orders? res.json(orders): res.status(400).json({message: 'Invalid'}))
        .catch(err=>next(err))
}



