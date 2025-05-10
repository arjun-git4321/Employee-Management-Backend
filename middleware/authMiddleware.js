const express=require('express');
const jwt=require("jsonwebtoken");


exports.verifyUser=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(404).json({
                success:false,
                error:"Token not provided"
            })
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(404).json({
                success:false,
                error:"Token not valid"
            })
        }

        req.user=decode;
        next();


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'error while validating the token',
        })

    }
}
