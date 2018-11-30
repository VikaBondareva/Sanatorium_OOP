const db = require('../_helpers/db');
const Service = db.Services;
const TypesService=db.TypesService;


module.exports = {
    create,
    getAllServices,
    getByOneService,
    update,
    _delete,
    sortServicesOnTypes,
    addType
};

async function getAllServices(){
    const types = await TypesService.find();
    const JTypes= [];
    // const services = await Service.find();
    // const JsonSevices = services.toObject();
    
    for(let i=0; i<types.length; i++){
        JTypes.push(types[i].toObject());
        JTypes[i]["services"]= await Service.find({serviceType_id: types[i]._id});
    }
    return JTypes;
}

async function getByOneService(id){
    return await Service.findById(id)
}

async function addType(param){
    const type = TypesService(param);

    await type.save();
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
     // const types = await TypesService.find();
    // let mapServices=[];
    // for(let i=0; i<types.length; i++){
        // mapServices.push(types[i]);
        // mapServices[i].service=[];
        // mapServices[i].push(services.find(x=>x.serviceType_id==mapServices[i]._id))
        // mapServices.set(types[0], services.find(x=>x.serviceType_id===types[i]._id));
    // }
    // let sortServices= Array.from(mapServices.key);
}