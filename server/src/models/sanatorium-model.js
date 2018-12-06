var mongoose= require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

var CardSchema = new Schema (
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            unique: true
        },
        birth: {
            type: mongoose.Schema.Types.Date,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        addres: {
            type: String,
            required: true
        },
        statusCard_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'statuscard',
            required: true
        },
        dateArrival:{
            type:mongoose.Schema.Types.Date,
            required: true
        },
        dateDeparture:{
            type: mongoose.Schema.Types.Date,
            required: true
        },
        totalPrice:{
            type: mongoose.Schema.Types.Double,
            default: 0.0
        }
        
    },
    { versionKey: false }
);

var OrderSchema= new Schema(
    {
        service_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'services',
            require: true
        },
        card_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sanatorium_cards',
            require: true
        },
        date: {
            type: mongoose.Schema.Types.Date,
            required: true
        },
        statusOrder_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ststuscard',
            require: true
        }
    },
    { versionKey: false }
);

var StatusShema = new Schema({
    name:{
        type: String,
        required:true 
    }
});

OrderSchema.set('toJSON', { virtuals: true});
CardSchema.set('toJSON', { virtuals: true});

var Orders = mongoose.model('orders', OrderSchema);
var Cards= mongoose.model('sanatorium_cards', CardSchema);
var Statuts = mongoose.model('statuscard', StatusShema);
module.exports={
    Orders,Cards,Statuts
};

