const config = require('../config/config');
const {secret} = require('../config/config').jwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const authHelper = require('../_helpers/authHelper');

const mongoose = require('mongoose');

const User = mongoose.model('users');
const Token = mongoose.model("tokens");
//const User = db.User;
//const Token = db.Token;
module.exports = {
    authenticate,
    create,
    getAll,
    getById,
    _delete,
    logout,
    refreshTokens
}

function updateToken(userId){
    
    const accessToken  = authHelper.generateAccessToken(userId);
    const refreshToken  = authHelper.generateRefreshToken(userId);
    
   authHelper.replaceDbrefreshToken(refreshToken.id,userId)
     return {
            accessToken,
            refreshToken: refreshToken.token,
        };
}

async function authenticate({email, password}) {
    const user = await User.findOne({email});
    if(user && bcrypt.compareSync(password, user.password)){       
       return  updateToken(user._id);
    }
    else {
        throw new Error('User not found');
    }
}

async function refreshTokens(id){
    
   const token =   await Token.findOne({tokenId: id})
   if(!token) throw new Error('Invalid token, not found '+id)
   const tok = updateToken(token.userId);
    return tok;
}

async function logout(id){
    
}

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
    user.role=2;
    
    await user.save()
}

async function _delete(id){
    await User.findByIdAndRemove(id);
}
