const db = require('../_helpers/db');
const Cards = db.Cards;
const Statuts = db.Statuts;
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
    getOrderRegister,
    getStatuts,
    getOrdersActive
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
    const order =await Orders.findById(idOrder);
    if(!order._id) throw "Don't found order";

    order.statusOrder_id=idStatus.statusId;
    await order.save();
}

async function removeOrder(id){
    await Orders.findByIdAndRemove(id);
}

/////private
async function getOrdersByStatus(byStatus){
    
    const status = await Statuts.findOne({name: byStatus});
    if(!status._id) 
        throw Error('invalid status');
    
    const ordersDb = await Orders.find({statusOrder_id: status._id}).sort({date: 1});
    let orders = [];
    
    for(let i=0; i<ordersDb.length; i++){
        
        orders.push(ordersDb[i].toObject());
        const card = await  Cards.findById(ordersDb[i].card_id);
        
        if(!card) 
            throw new Error(`Not found card for ${ordersDb[i]._id}`);
        
        const service = await Service.findById(ordersDb[i].service_id);
        const user = await User.findById(card.user_id);
        
        if(!user) 
            throw new Error(`Not found user for ${ordersDb[i]._id}`);
        
        orders[i]['user'] = user.toObject();
        orders[i]['service'] = service;
        orders[i]['user']['phone'] = card.phone;
        delete orders[i]['user']['password'];
        delete orders[i]['user']['email'];
        delete orders[i]['user']['role'];
        delete orders[i]['user']['password'];
    }    
    
    return orders;
}

async function getOrderRegister(){
    const statuts = await getStatuts();
    const orders = await getOrdersByStatus("REGISTER");  
    return {orders, statuts};
}

async function getOrdersActive(){
    const orders = await getOrdersByStatus("ACTIVE");  
    return orders;
}

async function getStatuts(){
    const statuts = await Statuts.find();
    if(!statuts) throw Error('invalid status');
    return statuts;
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

