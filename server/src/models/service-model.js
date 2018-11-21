var mongoose= require('mongoose')
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

mongoose.Promise = global.Promise;
 
var ServiceSchema = new Schema(
    {
        _id:{
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        measure: {
            type: String,
            default: "процедура"
        },
        price: {
            type: mongoose.Schema.Types.Double,
            default: 0,
            get: v=> {if(v==0) return "Беплатно"
                      else return v}
        },
        serviceType_id:{
            type: Number,
            ref: 'servicesTypes',
            required: true
        }
    },
    { versionKey: false }
)

var ServiceTypeSchema = new Schema(
    {
        _id:{
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
)

var type= mongoose.model('servicesTypes', ServiceTypeSchema)
var Service= mongoose.model('services', ServiceTypeSchema)
module.exports=Service
module.exports=type

