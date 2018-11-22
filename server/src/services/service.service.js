const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Service = db.Services;
const TypesService=db.TypesService;


module.exports = {
    create,
    getAllServices,
    getByOneService,
    update,
    _delete,
    sortServicesOnTypes
};

async function getAllServices(){
    return await Service.find()
}

async function getByOneService(id){
    return await Service.findById(id)
}

async function create(serviceParam){
    const name = serviceParam.name;
    if(await Service.findOne({name: name})){
        throw `Servise name '${name}' is already taken`;
    }
    
    const service = new Service(serviceParam);
    
    await service.save()
}

async function update(id, serviceParam){
    const service = await Service.findById(id);
    
    if(!service){
        throw 'Service not found';
    }
    
    Object.assign(service,serviceParam);
    
    await service.save();
}

async function _delete(id){
    await Service.findByIdAndRemove(id);
}

async function getListType(typeId){
    return await Service.find({serviceType_id: typeId}).sort({price:1})
}

async function getSortServices(value, index, typeId){
    const sorting = {value: index}
    
    return getListType(typeId).sort(sorting)
}


//////-------------
async function sortServicesOnTypes(){
    const types = await TypesService.find();
    // const sortService = [];
    // for(let i=0; i<types.length; i++){
    //     sortService.push(getListType(types[i]._id));
    // }

    return types;
    //return sortService;
}