const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    create,
    getAll,
    getById,
    _delete
}

async function authenticate({email, password}) {
    const user = await User.findOne({email});
    if(user && bcrypt.compareSync(password, user.password)){
        const accessToken = jwt.sign({sub: user.id}, config.authentication.secret,  {
         expiresIn: '0.5h'
       });
        const refreshToken = jwt.sign({sub: user.id}, config.authentication.refreshTokenSecret,{
         expiresIn: 60*60
       })
        return {
            accessToken,
            refreshToken
        };
    }
}
// async function refreshToken({refreshToken}){
//     if(refreshToken!=='unfidented'){
        
//     }
//     const accessToken = jwt.sign({sub: user.id}, config.authentication.secret);
//     const refreshToken = jwt.sign({sub: user.id}, config.authentication.refreshTokenSecret)
// }

async function getAll(){
    return await User.find();
}

async function getById(id){
    return await User.findById(id);//.select('-password');
}


async function create(userParam){
    if(await User.findOne({email: userParam.email})){
        throw `Username ${userParam.email} is already taken`;
    }
    const user = new User(userParam);
    user.roles.push(2);
    
    await user.save()
}

async function _delete(id){
    await User.findByIdAndRemove(id);
}

