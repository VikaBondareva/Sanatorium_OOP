var mongoose= require('mongoose')
var Schema = mongoose.Schema
require('mongoose-double')(mongoose);

var CardSchema = new Schema (
    {
        orders:{
            type: Array,
            required: true,
        },
        price: {
            type: mongoose.Schema.Types.Double,
            default: 0
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            unique: true
        },
        birth: {
            type: Date,
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
            type: Number,
            ref: 'statusCard',
            required: true
        },
        dataArrival:{
            type:Date,
            required: true
        },
        dataDeparture:{
            type: Date,
            required: true
        },
        
    },
    { versionKey: false }
)

varr OrderScheme= new Schema(
    {
        service_id: {
            type: Number,
            ref: 'services'
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        data: {
            type: Data,
            required: true
        },
        statusOrder_id: {
            type: Number,
            ref: 'ststusOrder'
        }
    },
    { versionKey: false }
)

var Orders = mongoose.model('orders', CardSchema)
var Cards= mongoose.model('sanatoriumCards', ServiceTypeSchema)
module.exports=Orders
module.exports=Cards

