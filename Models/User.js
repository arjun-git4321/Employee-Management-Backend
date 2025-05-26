// import mongoose from "mongoose";
const mongoose=require('mongoose');

const UserModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Employee"],
        required:true
    },
    // profile:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}

})

module.exports=mongoose.model("userModel",UserModel);