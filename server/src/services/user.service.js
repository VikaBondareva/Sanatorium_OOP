const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
    update,
}

async function update(id, userParam){
    const user = await User.findById(id);
    
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
//    if (userParam.password) {
//        userParam.hash = bcrypt.hashSync(userParam.password, 10);
//    }

    
    Object.assign(user,userParam);
    
    await user.save();
}
