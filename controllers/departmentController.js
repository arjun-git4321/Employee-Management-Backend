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
            message:"Department created successfully",
            // department:department,
            newDept
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

exports.fetchDepartment=async (req,res)=>{
    try{
        
        const departments=await model.find();
        res.status(200).json({
            success:true,
            message:'department find successfully',
            departments
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'getting department server error'
        })


    }
}


exports.getDepartment=async(req,res)=>{
    try{
        const {id}=req.params;
        const department=await model.findById({_id:id})
        res.status(200).json({
            success:true,
            department
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            error:'Error while editing the department'

        })

    }

}

exports.updateDepartment=async(req,res)=>{
    try{
        const {id}=req.params;
        const {dept_name,description}=req.body;
        const updateDepart=await model.findByIdAndUpdate({_id:id},{
            dept_name,description
        })
        res.status(200).json({
            success:true,
            updateDepart
        })


    }
    catch(error){
        res.status(500).json({
            success:false,
            error:'Error while editing the department'

        })


    }
}

exports.deleteDepartment=async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteDep=await model.findByIdAndDelete({_id:id})
        return res.status(200).json({
            success:true,
            message:"deleted succesfully",
            deleteDep
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Server error while deleteing the department"
        })

    }
}
