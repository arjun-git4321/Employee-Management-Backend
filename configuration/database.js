
const mongoose=require('mongoose')
require("dotenv").config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{

    })
    .then(()=>{console.log("db Connected successfully")})
    .catch((error)=>{
        console.log(error);
        console.log("Error in connection in DB");
        process.exit(1);
    })
}


