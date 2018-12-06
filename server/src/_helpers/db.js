const {User, Roles, UserRole} = require('../models/user-model');
const {Services, TypesService} = require('../models/service-model');
const {Cards, Orders, Statuts}= require('../models/sanatorium-model.js');
const Token = require('../models/token.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
    User,
    Services,
    Roles,
    UserRole,
    TypesService,
    Cards,
    Orders,
    Statuts,
    Token
};