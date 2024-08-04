const mongoose=require("mongoose");
const url="mongodb://localhost:27017/employee";
const connectDb=async ()=>{
    try{
        await mongoose.connect(url);
    }
    catch(error){
        console.log("not connected with database");
    }
}
module.exports=connectDb;