// import express from 'express'
const express=require('express');
const router=express.Router()



const{Signup}=require("../controllers/auth");
const{Login,verify}=require("../controllers/auth")

const {verifyUser}=require("../middleware/authMiddleware");

router.post("/signUp",Signup);

router.post("/login",Login)

router.get("/verify",verifyUser,verify)



module.exports=router;