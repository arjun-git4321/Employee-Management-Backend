const express=require('express')

const router=express.Router();


const {verifyUser}=require("../middleware/authMiddleware")
const {AddEmployee,upload,fetchEmployee}=require("../controllers/employeeController")


router.post("/add",verifyUser,upload.single('profileImage'),AddEmployee);
router.get("/",verifyUser,fetchEmployee);
// router.get('/:id',verifyUser,getDepartment)
// router.put('/:id',verifyUser,updateDepartment)
// router.delete('/:id',verifyUser,deleteDepartment)






module.exports=router;