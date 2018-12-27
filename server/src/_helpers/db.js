const {User, Roles, UserRole} = require('../models/user');
const {Services, TypesService} = require('../models/service');
const {Cards, Orders, Statuts}= require('../models/sanatorium.js');
const {Schedule} = require('../models/schedule.js')
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
    Token,
    Schedule
};