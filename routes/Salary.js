const express=require('express')

const router=express.Router();


const {verifyUser}=require("../middleware/authMiddleware");
const { addSalary,getSalary } = require('../controllers/salaryController');

router.post("/add",verifyUser,addSalary);
router.get("/:id",verifyUser,getSalary)


module.exports=router;