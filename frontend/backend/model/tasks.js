const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String},
    attachments:{type:String},
},{timestamps:true})

const tasksModel=mongoose.model('tasks',taskSchema)
module.exports=tasksModel