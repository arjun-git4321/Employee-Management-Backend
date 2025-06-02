// const express=require('express')

const Salary=require('../Models/Salary');

exports.addSalary=async(req,res)=>{
    try{
        const{employeeId,basicSalary,allowances,deductions,payDate}=req.body;
        const totlaSalary=parseInt(basicSalary)+parseInt(allowances)+parseInt(deductions)

        const newSalary=await Salary.create({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalaray:totlaSalary,
            payDate
        })

        return res.status(200).json({

            success:true,
            message:'salary crated successfully',
            newSalary
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({

            success:false,
            message:'Error while creating the salary',
        })

    }

}

exports.getSalary=async(req,res)=>{
    try{
        const{id}=req.params;
        const salary=await Salary.find({employeeId:id}).populate('employeeId','employeeId')
        return res.status(200).json({
            success:true,
            message:'salary fetched successfully',
            salary
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({

            success:false,
            message:'Error while creating the salary',
        })

    }

}

