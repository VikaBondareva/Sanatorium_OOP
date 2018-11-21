const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Service = db.Service;
const TypeService=db.TypesService;


module.exports = {
    create
    getAll,
    getById,
    update,
    delete
}




async function getAll(){
    return await Service.find()
}

async function getById(id){
    return await Service.findById(id)
}

async function create(serviceParam, type){
    if(await Service.findOne({email: userParam.email})){
        throw `Username ${serviceParam.email} is already taken`;
    }
    
    const service = new Service(serviceParam);
    // const roleUser = await Roles.findOne({role: "ROLE_USER"});
    // const userRole = new UserRole({role_id: roleUser._id, user_id: user._id});
    
    // await userRole.save();
    
    await service.save()


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