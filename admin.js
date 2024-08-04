const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const adminModel=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});
const Secret_key="sayani";
adminModel.methods.genToken=function(req,res){
    return jwt.sign({
        adminId:this._id.toString(),
        adminEmail:this.email,
    },Secret_key);
}
const admin=mongoose.model("admin",adminModel);
module.exports=admin;