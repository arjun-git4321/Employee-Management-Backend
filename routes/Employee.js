const express=require('express')

const router=express.Router();


const {verifyUser}=require("../middleware/authMiddleware")
const {AddEmployee,upload,fetchEmployee,getEmployee}=require("../controllers/employeeController")


router.post("/add",verifyUser,upload.single('profileImage'),AddEmployee);
router.get("/",verifyUser,fetchEmployee);
router.get('/:id',verifyUser,getEmployee)
// router.put('/:id',verifyUser,updateDepartment)
// router.delete('/:id',verifyUser,deleteDepartment)





module.exports=router;