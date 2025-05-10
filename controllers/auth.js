const express=require('express');
const User=require("../Models/User");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.Signup=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;

        const hashPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashPassword,
            role

        });
        return res.status(200).json({
            success:true,
            message:'user created successfully',
            user
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error which creating the data'
        })

    }

}


exports.Login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:'All fields are mandatory',
                success:false,
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:'This user not found',
            });
        }
        if(await bcrypt.compare(password, user.password)){
            const payload={
                email:user.email,
                id:user._id,
            }
            // const token=jwt.sign(payload,process.env.JWT_SECRET,{
            //     expiresIn:"24hr",
            // });
            const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, 
                { expiresIn: '1h' });

            user.token=token;
            user.password=undefined;


            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).json({
                success:true,
                token,
                user,
                message:'user login successfully',

            });
        }
        else{
            res.status(400).json({
                success:false,
                message:'password incorrect',
            })
        }
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:'login failed'
        })

    }
}
exports.verify=(req,res)=>{
    return res.status(200).json({success:true,user:req.user})
}