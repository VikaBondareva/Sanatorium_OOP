var mongoose= require('mongoose')
var Schema = mongoose.Schema

mongoose.Promise = global.Promise;
 
var UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname:{
            type: String,
            required: true
        },
        patronymic:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        card_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sanatoriumCards',
        },
//        birth: {
//            type: Data,
//            required: true
//        },
        phone: {
            type: String,
        },
        addres: {
            type: String
        },
    },
    { versionKey: false }
)

var RoleScheme = new Schema({
    _id: {
        type: Number  
    },
    name:{
        type:String,
        required: true
    }
})

var User = mongoose.model("users", UserSchema);
var Roles= mongoose.model("roles", RoleScheme);
module.exports.Roles=Roles;
module.exports.User=User;