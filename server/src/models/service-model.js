var mongoose= require('mongoose')
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

mongoose.Promise = global.Promise;
 
var ServiceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
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

ServiceSchema.set('toJSON', { virtuals: true});

var TypesService= mongoose.model('servicesTypes', ServiceTypeSchema)
var Services= mongoose.model('services', ServiceSchema)
module.exports={
    Services,
    TypesService
}

