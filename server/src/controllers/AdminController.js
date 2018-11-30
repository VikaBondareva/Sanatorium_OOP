const adminService = require('../services/admin.service.js');

module.exports={
    changeStatusOrder,
    changeStatusCard
}


function changeStatusOrder(req,res,next){
    adminService.changeStatusOrder(req.params.id,req.body)
        .then(()=>res.json({message: "Status order change succesfully"}))
        .catch(err=>next(err))
}

function changeStatusCard(req,res,next){
    adminService.changeStatusCard(req.params.id,req.body)
        .then(()=>res.json({message: "Status card change succesfully"}))
        .catch(err=>next(err))
}





