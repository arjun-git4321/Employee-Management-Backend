const express=require('express')

const router=express.Router();


const {verifyUser}=require("../middleware/authMiddleware")
const {AddEmployee,upload,fetchEmployee,getEmployee,updateEmployee,fetchEmpByDepId}=require("../controllers/employeeController")


router.post("/add",verifyUser,upload.single('profileImage'),AddEmployee);
router.get("/",verifyUser,fetchEmployee);
router.get('/:id',verifyUser,getEmployee);
router.put('/:id',verifyUser,updateEmployee);
router.get('/department/:id',verifyUser,fetchEmpByDepId);



module.exports=router;