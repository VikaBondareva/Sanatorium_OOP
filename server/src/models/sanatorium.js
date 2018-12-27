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
            ref: 'statuscards',
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
var Statuts = mongoose.model('statuscards', StatusShema);
module.exports={
    Orders,Cards,Statuts
};

