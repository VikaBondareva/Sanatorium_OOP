const db = require('../_helpers/db');
const User = db.User;
const Cards = db.Cards;
const Orders = db.Orders;
const Service = db.Services;
const Statuts = db.Statuts;

module.exports = {
    update,
    getById,
    createCard,
    orderService,
    deleteOrder,
    getCardsUser,
    changeOrderDate
}

async function getFullCurrentCardUser(id) {
    let card = await Cards.findOne({ user_id: id});
    if(!card) return {};
    let JsonCard = card.toObject();
    const orders = await Orders.find({card_id: card._id}).sort({date: 1});
    const JsonOrsers = [];
    for (let i = 0; i < orders.length; i++) {
        JsonOrsers.push(orders[i].toObject())
        const service = await Service.findOne({
            _id: orders[i].service_id
        });
        JsonOrsers[i]["service"] = service;
        delete JsonOrsers[i]["service_id"];
        delete JsonOrsers[i]["card_id"];
    }
    JsonCard["orders"] = JsonOrsers;
    return JsonCard;
}

async function getById(id) {
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    let JsonUser = user.toObject();

    JsonUser.card = await getFullCurrentCardUser(user._id);
//    let card = await Cards.findOne({
//        user_id: user._id
//    });
//    JsonUser["orders"] = [];
//    if (!card) {
//        return JsonUser;
//    };
//    const orders = await Orders.find({
//        card_id: card._id
//    }).sort({date: 1});
//    const JsonOrsers = [];
//    for (let i = 0; i < orders.length; i++) {
//        JsonOrsers.push(orders[i].toObject())
//        const service = await Service.findById(orders[i].service_id);
//        JsonOrsers[i]["service"] = service;
//        delete JsonOrsers[i]["service_id"];
//    }
//
//    JsonUser["orders"] = JsonOrsers;
    return JsonUser;
}

async function update(id, userParam) {
    const user = await User.findById(id);

    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({
            email: userParam.email
        })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }
    Object.assign(user, userParam);

    await user.save();
}

async function createCard(id, cardParam) {
    const status = await Statuts.findOne({
        name: "REGISTER"
    });
    if (!status) throw "Srtatus invalid"
    const car = await Cards.findOne({
        user_id: id
    })
    if (car) {
        throw `Карточка для данного пользователя уже существует`;
    }
    const card = new Cards({
        user_id: id,
        phone: cardParam.phone,
        addres: cardParam.addres,
        birth: cardParam.birth,
        dateArrival: cardParam.dateArrival,
        dateDeparture: cardParam.dateDeparture,
        statusCard_id: status._id
    });
    
    await card.save();
}

async function changeOrderDate(id, data){
    const order=await Orders.findById(id);
    order.date = data.date;
    
    await order.save();
}

async function orderService(orderParam, idUser) {

    const status = await Statuts.findOne({
        name: "REGISTER"
    });
    if (!status) throw "Status invalid"
    const card = await Cards.findOne({
        user_id: idUser
    });
    if (!card) throw "error card"
    const service = await Service.findById(orderParam.service_id);
    if (!service)
        throw "not found service with this id"
    
    const orders = await Orders.find({card_id: card.id, service_id: orderParam.service_id});
    for(let i=0; i<orders.length; i++){
        const date =orders[i].date.toISOString().substr(0, 10);
        if(date === orderParam.date.substr(0, 10))
             throw "error date";
    }
    
    const order = new Orders({
        card_id: card._id,
        service_id: orderParam.service_id,
        date: orderParam.date,
        statusOrder_id: status._id
    })
    await order.save()
}

async function deleteOrder(id) {
    await Orders.findByIdAndRemove(id);
}

async function getCardsUser(id) {
    let cards = await Cards.find({
        user_id: id
    });
    let JsonCards = cards.toObject();
    for (let i = 0; i < cards.length; i++) {
        const orders = await Orders.find({
            card_id: id
        });
        JsonCards[i]["orders"] = orders
    }
    return JsonCards;
}

async function getCurrentCardUser(id) {
    const card = await Cards.findOne({
        user_id: id
    });
    return card;
}

