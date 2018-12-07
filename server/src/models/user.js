var mongoose= require('mongoose')
var Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

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
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        card_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sanatorium_cards',
        },
        role: {type: Number, ref: 'roles'}
    }
)


////hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var RoleScheme = new Schema({
    _id: {
        type: Number  
    },
    name:{
        type:String,
        required: true
    }
})

UserSchema.set('toJSON', { virtuals: true});

var User = mongoose.model("users", UserSchema);
var Roles= mongoose.model("roles", RoleScheme);
module.exports={
    User,
    Roles
}
