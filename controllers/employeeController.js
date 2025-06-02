const express=require('express');
const Employee=require("../Models/Employee");
const User=require("../Models/User");
const bcrypt=require("bcrypt")
const multer=require("multer")
const path=require("path")
const Department=require("../Models/Department")


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

exports.updateEmployee=async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,martialStatus,designation,department,salary}=req.body;

        // console.log('Employee ID to update:', req.params.id);


        const employee=await Employee.findById({_id:id})
        if(!employee){
            return res.status(404).json({
                success:false,
                message:"Employee not found"
            })
        }
        const user=await User.findById({_id:employee.userId})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name})
        const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{
            martialStatus,designation,salary,department
        })
        if(!updateUser || !updateEmployee){
            return res.status(404).json({
                success:false,
                message:"document not found"
            })

        }
        return res.status(200).json({
            success:true,
            message:"updated successfully"
        })
        

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'error while updating the employee'
        })

    }

}

exports.fetchEmpByDepId=async(req,res)=>{
    const{id}=req.params;
    try{
        const employees=await Employee.find({department:id})
        return res.status(200).json({
            success:true,
            message:'fetch successfully',
            employees
        })
        

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'get employesGetDepById server error'
        })

    }

}
