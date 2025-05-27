const express=require('express');
const Employee=require("../Models/Employee");
const User=require("../Models/User");
const bcrypt=require("bcrypt")
const multer=require("multer")
const path=require("path")


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})


exports.upload=multer({storage:storage})


exports.AddEmployee=async(req,res)=>{
    try{
        const {name,email,employeeId,dob,gender,martialStatus,
            designation,department,salary,password,role}=req.body;
    
    
            const user=await User.findOne({email})
            if(user){
                return res.status(400).json({
                    success:false,
                    error:"user already registered"
                })
            }
    
            const hashPassword=await bcrypt.hash(password,10)
    
            
            const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
            const newUser=await User.create({
                name,
                email,
                password:hashPassword,
                role:normalizedRole,
                profileImage:req.file ? req.file.filename : ""

            })
            const newEmployee=await Employee.create({
                    userId:newUser._id,
                    employeeId,
                    dob,
                    gender,
                    martialStatus,
                    designation,
                    department,
                    salary
                })


            return res.status(200).json({
                success:true,
                message:"Employee create Successfully",
                newEmployee
            })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:'error while creating the employee'
        })


    }
    

}

exports.fetchEmployee=async(req,res)=>{
    try{
        const employees=await Employee.find().populate('userId',{password:0}).populate('department')
        return res.status(200).json({
            success:true,
            message:'employee fetch successfully',
            employees
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'Error while fetching the employee'
        })

    }


}
exports.getEmployee=async(req,res)=>{
    const {id}=req.params;
    try{
        const employee=await Employee.findById(id).populate('userId',{password:0}).populate("department")
        return res.status(200).json({
            success:true,
            message:'employee find successfully',
            employee
        })

    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:'Error while fetching the employee'
        })

    }
}
