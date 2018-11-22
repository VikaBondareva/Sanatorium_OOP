var mongoose= require('mongoose')
var Schema = mongoose.Schema

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
            unique: true
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
        roles: [{type: Number, ref: 'roles'}]
    },
    { versionKey: false }
)

////authenticate input against database
//UserSchema.statics.authenticate = function (email, password, callback) {
//  User.findOne({ email: email })
//    .exec(function (err, user) {
//      if (err) {
//        return callback(err)
//      } else if (!user) {
//        var err = new Error('User not found.');
//        err.status = 401;
//        return callback(err);
//      }
//      bcrypt.compare(password, user.password, function (err, result) {
//        if (result === true) {
//          return callback(null, user);
//        } else {
//          return callback();
//        }
//      })
//    });
//}
//
////hashing a password before saving it to the database
//UserSchema.pre('save', function (next) {
//  var user = this;
//  bcrypt.hash(user.password, 10, function (err, hash) {
//    if (err) {
//      return next(err);
//    }
//    user.password = hash;
//    next();
//  })
//});


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
