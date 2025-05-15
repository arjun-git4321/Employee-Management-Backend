const express=require('express')

const router=express.Router();


const {verifyUser}=require("../middleware/authMiddleware")
const {AddDepartment,addDepartment,getDepartment,updateDepartment, deleteDepartment}=require("../controllers/departmentController")


router.post("/add",verifyUser,AddDepartment);
router.get("/",verifyUser,addDepartment);
router.get('/:id',verifyUser,getDepartment)
router.put('/:id',verifyUser,updateDepartment)
router.delete('/:id',verifyUser,deleteDepartment)



module.exports=router;