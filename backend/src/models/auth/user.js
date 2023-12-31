const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authUser = new Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    favoriteCoins: {
        type: Array,
        required: false
    }

});

const userAuth = mongoose.model("Users", authUser);

module.exports = userAuth;