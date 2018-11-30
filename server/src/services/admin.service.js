const db = require('../_helpers/db');
const Cards = db.Cards;
const Orders= db.Orders;

module.exports = {
    changeStatusCard,
    changeStatusOrder
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