const express=require('express')

const router=express.Router();


const {verifyUser}=require("../middleware/authMiddleware")
const {AddDepartment}=require("../controllers/departmentController")


router.post("/add",verifyUser,AddDepartment);

module.exports=router;