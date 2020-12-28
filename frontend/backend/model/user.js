const mongoose=require('mongoose');

const registerSchema=new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true,min:5},
    mobile:{type:Number,required:true,trim:true},
},{timestamps:true})

const registerModel=mongoose.model('users',registerSchema)
module.exports=registerModel