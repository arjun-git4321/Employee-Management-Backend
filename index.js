const express=require('express');
// import cors from 'cors'
const cors=require("cors");
const app=express()
const cookieParser=require('cookie-parser')
require('dotenv').config();

app.use(cors({ origin: 'http://localhost:5173' , credentials: true}));
app.use(express.json())


const userRoute=require("./routes/User");
const departmentRoute=require("./routes/Department")
const employeeRoute=require("./routes/Employee")
const salaryRoute=require("./routes/Salary")

const connection=require('./configuration/database');
connection.dbConnect();

app.use(cookieParser());
app.use('/uploads',express.static('public/uploads'))

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/departments",departmentRoute)
app.use("/api/v1/employee",employeeRoute)
app.use("/api/v1/salary",salaryRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running in ${process.env.PORT}`);
})



