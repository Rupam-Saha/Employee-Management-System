const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const regSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    joining_year:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const Secret_key="sayani";
regSchema.methods.genToken=function(req,res){
    try{
        return jwt.sign({
            empid:this._id.toString(),
            empEmail:this.email
        },Secret_key);
    }
    catch(error){
        res.json({msg:"can't generate token"});
    }
}
const emp=mongoose.model("register",regSchema);
module.exports=emp;