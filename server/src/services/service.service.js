const db = require('../_helpers/db');
const Service = db.Services;
const TypesService=db.TypesService;
const Schedule = db.Schedule;

module.exports = {
    getAllServices,
    getByOneService,
    getScheduleAllSerivces
};

async function getAllServices(){
    const types = await TypesService.find();
    const JTypes= [];
    
    for(let i=0; i<types.length; i++){
        JTypes.push(types[i].toObject());
        JTypes[i]["services"]= await Service.find({serviceType_id: types[i]._id});
    }
    return JTypes;
}

async function getByOneService(id){
    return await Service.findById(id)
}

async function getScheduleAllSerivces(){
    const services = await Service.find();
    const jsonServices = [];
    for(let i=0; i<services.length; i++){
        jsonServices.push(services[i].toObject());
        jsonServices[i]["schedule"] = await Schedule.find({service_id: services[i]._id});
    }
    
    return jsonServices;
}