const admin=require("../models/admin");
const emp=require("../models/auth-model");
const quali=require("../models/qualification-model");
const contact=require("../models/contact-model");
const statSchema = require("../models/statistics");
const login=async (req,res)=>{
    try{
        const response=req.body;
        const x=await admin.findOne({email:response.email,password:response.password});
        if(x){
            res.status(200).json({msg:"Login successfull",token:x.genToken()});
        }
        else{
            res.status(400).json({msg:"incorrect admin details"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
const emp_details=async (req,res)=>{
    try{
        const token=req.header("Authorization");
        const allEmp=await emp.find().select({password:0});
        if(allEmp){
            res.status(200).json(allEmp);
        }
        else{
            res.status(200).json({msg:"empty details"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
const emp_qualification=async (req,res)=>{
    try{
        const token=req.header("Authorization");
        const data=await quali.find({});
        if(data){
            res.status(200).json(data);
        }
        else{
            res.status(200).json({msg:"empty details"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
const contact_details=async (req,res)=>{
    try{
        const token=req.header("Authorization");
        const data=await contact.find({});
        res.status(200).json(data);
    }
    catch(error){
        res.status(400).json(error);
    }
}
const delete_emp_details=async (req,res)=>{
    try{
        const email=req.params.email;
        const token=req.header("Authorization");
        const del=await emp.deleteOne({email:email});
        if(del){
            res.status(200).json({msg:"successfully deleted"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
const delete_emp_qualification=async (req,res)=>{
    try{
        const email=req.params.email;
        const del=await quali.deleteOne({email:email});
        res.status(200).json({msg:"successfully deleted"});
    }
    catch(error){
        res.status(400).json(error);
    }
}
const delete_emp_contact=async (req,res)=>{
    try{
        const email=req.params.email;
        const del=await contact.deleteOne({email:email});
        res.status(200).json({msg:"successfully deleted"});
    }
    catch(error){
        res.status(400).json(error);
    }
}
const get_emp_details=async (req,res)=>{
    try{
        const id=req.params.id;
        const data=await emp.findOne({_id:id},{password:0});
        if(data){
            res.status(200).json(data);
        }
        else{
            res.status(200).json({msg:"id is not present"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
const update_emp_details=async (req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const a=await emp.findOne({_id:id});
        const oldemail=a.email;
        const update=await emp.updateOne({_id:id},{$set:data});
        res.status(200).json({msg:"updated successfully"});
        const x=await quali.updateOne({email:oldemail},{$set:{email:data.email}});
        const y=await contact.updateOne({email:oldemail},{$set:{email:data.email}});
    }
    catch(error){
        res.status(400).json(error);
    }
}
const get_emp_quali=async (req,res)=>{
    try{
        const id=req.params.id;
        const data=await quali.findOne({_id:id});
        res.status(200).json(data);
    }
    catch(error){
        res.status(400).json(error);
    }
}
const update_emp_quali=async (req,res)=>{
    try{
        const data=req.body;
        const id=req.params.id;
        const a=await quali.findOne({_id:id});
        const oldemail=a.email;
        const upd=await quali.updateOne({_id:id},{$set:data});
        res.status(200).json({msg:"update Successfully"});
        const x=await emp.updateOne({email:oldemail},{$set:{email:data.email}});
        const y=await contact.updateOne({email:oldemail},{$set:{email:data.email}});
    }
    catch(error){
        res.status(400).json(error);
    }
}
const admin_forgotpwd=async (req,res)=>{
    try{
        const data=req.body;
        const upd=await admin.updateOne({_id:data._id},{$set:{password:data.password}});
        if(upd.acknowledged){
            res.status(200).json({msg:"Password successfully updated"});
        }
        else{
            res.status(200).json({msg:"Incorrect id"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
const stat=async(req,res)=>{
    try{
        const x=await statSchema.find({});
        res.status(200).json(x);
    }
    catch(error){
        res.status(400).json(error);
    }
}
module.exports={login,emp_details,emp_qualification,contact_details,delete_emp_details,delete_emp_qualification,delete_emp_contact,get_emp_details,update_emp_details,get_emp_quali,update_emp_quali,admin_forgotpwd,stat};