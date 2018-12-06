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
    _deleteService
}

async function  changeStatusCard(idUser,idStatus){
    const card = Cards.findOne({user_id:idUser});
    card.statusCard_id=idStatus;

    await card.save();
}

async function  changeStatusOrder(idOrder,idStatus){
    const order = Orders.findOne({_id:idOrder});
    if(!order._id) throw "Don't found order";

    order.statusOrder_id=idStatus;
    await order.save();
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

async function addTypeService(param){
    const type =new TypesService(param);
    
    await type.save();
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

