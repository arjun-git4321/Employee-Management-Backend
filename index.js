const express=require('express');
// import cors from 'cors'
const cors=require("cors");
const app=express()
const cookieParser=require('cookie-parser')
require('dotenv').config();

app.use(cors({ origin: 'http://localhost:5173' , credentials: true}));
app.use(express.json())


const userRoute=require("./routes/User");

const connection=require('./configuration/database');
connection.dbConnect();

app.use(cookieParser());
app.use("/api/v1/auth",userRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running in ${process.env.PORT}`);
})