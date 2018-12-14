const config = require('../config/config');
const {secret} = require('../config/config').jwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const authHelper = require('../_helpers/authHelper');
const mongoose = require('mongoose');

const User = db.User;
const Token = mongoose.model('tokens');
const Roles = db.Roles;

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
        let admin = false;
        const userRole = await Roles.findById(user.role)
        if(userRole.name =="ADMIN"){
            admin = true;
        }
        const {accessToken,refreshToken} = updateToken(user._id);
        return {
            accessToken,
            refreshToken,
            admin
        };
    }
    else {
        throw new Error('User not found');
    }
}

async function refreshTokens(id){
   let admin = false;
   const token =   await Token.findOne({tokenId: id})
   if(!token) throw new Error('Invalid token, not found '+id)
    const user = await User.findById(token.userId)
    const userRole = await Roles.findById(user.role)
    if(userRole.name == "ADMIN"){
            admin = true;
    }
    const {accessToken,refreshToken}= updateToken(token.userId);
    return {
            accessToken,
            refreshToken,
            admin
        };
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
    const role = await Roles.findOne({name: "USER"});
    if(await User.findOne({email: userParam.email})){
        throw `Username ${userParam.email} is already taken`;
    }
    const user = new User(userParam);
    user.role=role._id;
    
    await user.save()
}

async function _delete(id){
    await User.findByIdAndRemove(id);
}
