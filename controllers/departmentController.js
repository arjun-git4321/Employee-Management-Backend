const express=require('express');
const model=require("../Models/Department")

exports.AddDepartment=async(req,res)=>{
    try{
        const {dept_name,description}=req.body;

        if(!dept_name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are mandatory'

            })
        }

        const newDept=await model.create({
            dept_name,
            description
        })

        res.status(200).json({
            success:true,
            message:"Course create successfully",
            data:newDept
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error while creating the department"
        })


    }
   


}

