const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favorite = new Schema({
    coin:{
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

});

const userAuth = mongoose.model("Users", authUser);

module.exports = userAuth;