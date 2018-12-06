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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'servicestypes',
            required: true
        }
    }
)

var ServiceTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
)

ServiceSchema.set('toJSON', { virtuals: true});
ServiceTypeSchema.set('toJSON', { virtuals: true});

var TypesService= mongoose.model('servicestypes', ServiceTypeSchema)
var Services= mongoose.model('services', ServiceSchema)

module.exports={
    Services,
    TypesService
}

