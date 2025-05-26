const mongoose=require("mongoose")

const EmployeeModel=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    employeeId:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date
    },
    gender:{
        type:String
    },
    martialStatus:{
        type:String
    },
    designation:{
        type:String
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"departmentModel",
        required:true
    },
    salary:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

}
    

)
module.exports=mongoose.model("employee",EmployeeModel)