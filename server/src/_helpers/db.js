const {User} = require('../models/user-model');
const {Services} = require('../models/service-model');

const config = require('../config/config');
const mongoose = require('mongoose');
mongoose.connect(config.dbURL, config.dbOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: User,
    Services : Services
}