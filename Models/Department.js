const mongoose=require('mongoose');

const DepartmentModel=new mongoose.Schema({
    dept_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("departmentModel",DepartmentModel);