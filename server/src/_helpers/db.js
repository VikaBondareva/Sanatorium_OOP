const {User, Roles, UserRole} = require('../models/user-model');
const {Services, TypesService} = require('../models/service-model');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
    User,
    Services,
    Roles,
    UserRole,
    TypesService
}