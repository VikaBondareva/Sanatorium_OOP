const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    create,
    getAll,
    getById
}

async function authenticate({email, password}) {
    const user = await User.findOne({email});
    if(user && bcrypt.compareSync(password, user.hash)){
        const { hash, ...userWithoutHash} = user.toObjesct();
        const token = jwt.sign({sub: user.id}, config.authentication.jwtSecret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll(){
    return await User.find().select('-hash');
}

async function getById(id){
    return await User.findById(id).select('-hash')
}

async function create(userParam){
    if(await User.findOne({email: userParam.email})){
        throw `Username ${userParam.email} is already taken`;
    }
    
    const user = new User(userParam);
    
    if(userParam.password){
        user.hash= bcrypt.hashSync(userParam.password,10);
    }
    
    await user.save();
}

async function update(id, userParam){
    const user = await User.findById(id);
    
    if(!user){
        throw 'User not found';
    }
    
    if(user.email !== userParam.email && await User.findOne({email: userParam.email})){
        userParam.hash = bcrypt.hashSync(userParam.password,10);
    }
    
    Object.assign(user,userParam);
    
    await user.save();
}

async function _delete(id){
    await User.findByIdAndRemove(id);
}