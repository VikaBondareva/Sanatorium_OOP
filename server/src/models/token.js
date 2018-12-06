const mongoose = require('mongoose');

var TokenScheme = new mongoose.Schema({
    tokenId: String,
    userId: String
})


var Token= mongoose.model("tokens", TokenScheme);
module.exports={
    Token
}
