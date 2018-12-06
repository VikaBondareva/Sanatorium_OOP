const db = require('../_helpers/db');
const Service = db.Services;
const TypesService=db.TypesService;


module.exports = {
    getAllServices,
    getByOneService,
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
