const db = require('../_helpers/db');
const Cards = db.Cards;
const User = db.User;
const Service = db.Services;
const TypesService=db.TypesService;
const Orders= db.Orders;

module.exports = {
    changeStatusCard,
    changeStatusOrder,
    getAllCards,
    createService,
    updateService,
    addTypeService,
    _deleteService,
    getAllOrder
}

async function changeStatusCard(idUser,idStatus){
    const card = Cards.findOne({user_id:idUser});
    card.statusCard_id=idStatus;

    await card.save();
}

async function getAllCards(){
    const cards =await Cards.find();
    let jsonCards =[];
    for(let i=0; i<cards.length; i++){
        jsonCards.push(cards[i].toObject());
        const user = await User.findById(cards[i].user_id);
        jsonCards[i]['user'] = user.toObject();
        delete jsonCards[i].user.password;
        delete jsonCards[i]['user']["_id"];
        delete jsonCards[i]['user']["role"];
    }
    return jsonCards;
}

async function changeStatusOrder(idOrder,idStatus){
    const order = Orders.findOne({_id:idOrder});
    if(!order._id) throw "Don't found order";

    order.statusOrder_id=idStatus;
    await order.save();
}

async function removeOrder(id){
    await Orders.findByIdAndRemove(id);
}

async function getAllOrder(){
    const orders = await Orders.find();
    let jsonOrders = [];
    
    for(let i=0; i<orders.length; i++){
        
        jsonOrders.push(orders[i].toObject());
        const card =await  Cards.findById(orders[i].card_id);
        if(!card) 
            throw new Error(`Not found card for ${orders[i]._id}`);
        const service = await Service.findById(orders[i].service_id);
        const user = await User.findById(card.user_id);
        if(!user) 
            throw new Error(`Not found user for ${orders[i]._id}`);
        jsonOrders[i]['user'] = user.toObject();
        jsonOrders[i]['service'] = service;
        jsonOrders[i]['user']['phone'] = card.phone;
        delete jsonOrders[i]['user']['password'];
        delete jsonOrders[i]['user']['email'];
        delete jsonOrders[i]['user']['role'];
        delete jsonOrders[i]['user']['password'];
    }    
    return jsonOrders;
}


async function addTypeService(param){
    const type =new TypesService(param);
    
    await type.save();
}

async function editTypeName(id, name){
    const typeService = await TypesService.findById(id);
    
    typeService.name = name;
    
    await typeService.save();
}


async function createService(serviceParam){
    const name = serviceParam.name;
    if(await Service.findOne({name: name})){
        throw `Servise name '${name}' is already taken`;
    }
    
    const service = new Service(serviceParam);
    
    await service.save()
}

async function updateService(id, serviceParam){
    const service = await Service.findById(id);
    
    if(!service){
        throw 'Service not found';
    }
    
    Object.assign(service,serviceParam);
    
    await service.save();
}

async function _deleteService(id){
    await Service.findByIdAndRemove(id);
}

