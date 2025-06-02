const mongoose=require('mongoose')

const salaryModel=new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employee',
        required:true,
    },
    basicSalary:{
        type:Number,
        required:true,
    },
    allowances:{
        type:Number,
    },
    deductions:{
        type:Number,
    },
    netSalary:{
        type:Number,
    },
    payDate:{
        type:Date,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }

})

module.exports=mongoose.model("Salary",salaryModel)