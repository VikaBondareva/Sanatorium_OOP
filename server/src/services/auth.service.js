const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;
const Roles=db.Roles;
const UserRole= db.UserRole;


const roleAdmin = Roles.findOne({name: "ROLE_ADMIN"});


module.exports = {
    authenticate,
    create,
    getAll,
    getById,
    update,
    _delete
}


const ONE_WEEK = 60*60*24*7;

async function authenticate({email, password}) {
    const user = await User.findOne({email});
    if(user && bcrypt.compareSync(password, user.password)){
        const { hash, ...userWithoutHash} = user.toObject();
        const token = jwt.sign({sub: user.id}, config.authentication.jwtSecret,{
        expiresIn: ONE_WEEK});
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
    // const roleUser = await Roles.findOne({role: "ROLE_USER"});
    // const userRole = new UserRole({role_id: roleUser._id, user_id: user._id});
    
    // await userRole.save();
    if(userParam.password){
        user.password = bcrypt.hashSync(userParam.password,10);
    }
    
    await user.save()


}

async function update(id, userParam){
    const user = await User.findById(id);
    
    if(!user){
        throw 'User not found';
    }
    
    if(user.email !== userParam.email && await User.findOne({email: userParam.email})){
        userParam.password = bcrypt.hashSync(userParam.password,10);
    }
    
    Object.assign(user,userParam);
    
    await user.save();
}

async function _delete(id){
    await User.findByIdAndRemove(id);
}