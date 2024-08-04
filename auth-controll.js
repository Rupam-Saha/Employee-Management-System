const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const emp =require("../models/auth-model");
const statSchema=require("../models/statistics");
const register=async (req,res)=>{
    try{
        const data=req.body;
        const saltround=10;
        const newpwd=await bcrypt.hash(data.password,saltround);
        data.password=newpwd;
       // res.json(data.password);
        const check=await emp.findOne({email:data.email});
        if(!check){
            const newEmp=await emp.create(data);
            const x=await statSchema.findOne({year:data.joining_year});
            x.number_of_employees=+1;
            x.save();
            res.status(200).json({msg:"registeration successful",token:newEmp.genToken()});
        }
        else{
            res.status(400).json({msg:"already exists"});
        }
    }
    catch(error)
    {
        res.status(400).json({error:"error"});
    }
}
const login=async (req,res)=>{
    try{
        const data=req.body;
        const x=await emp.findOne({email:data.email});
        if(x){
            const empExist=await bcrypt.compare(data.password,x.password);
            if(empExist){
                res.status(200).json({message:"login successful",token:x.genToken()});
            }
            else{
                res.status(400).json({message:"wrong password"});
            }
        }
        else{
            res.status(400).json({message:"this email id is not exists"});
        }
    }
    catch(error){
        console.log(error);
    }
}
const details=async (req,res)=>{
        try{
            const token=req.header("Authorization");
            //console.log(token);
            const updateToken=token.replace("Bearer ","").trim();
            //console.log(updateToken);
            const x=jwt.verify(updateToken,"sayani");
            //console.log(x);
            if(x){
                const data=await emp.findOne({email:x.empEmail})
                res.json(data);
            }
            else{
                res.status(400).json({msg:"can't find"});
            }
        }
        catch(error){
            res.status(400).json(error);
        }
}
const qualiSchema=require("../models/qualification-model");
const quali=async (req,res)=>{
    try{
        const response=req.body;
        const ch=await emp.findOne({email:response.email});
        if(ch){
            const x=await qualiSchema.findOne({email:response.email});
            if(x){
                res.status(400).json({msg:"already this email exists on the server"});
            }
            else{
                const y=await qualiSchema.create(response);
                res.status(200).json({msg:"register Successful"});
            }
        }
        else{
            res.status(400).json({msg:"not valid email id"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
const qualidetails=async(req,res)=>{
    try{
        const token=req.header("Authorization");
        const updateTok=token.replace("Bearer ","").trim();
        //console.log(updateTok);
        const ver=jwt.verify(updateTok,"sayani");
        console.log(ver);
        if(ver){
        const data=await qualiSchema.findOne({email:ver.empEmail});
        res.status(200).json({data});
        } 
    }
    catch(error){
        res.status(400).json(error);
    }
}
const ContactForm=require("../models/contact-model");
const contact=async (req,res)=>{
    try{
        const response=req.body;
        const ch=await emp.findOne({email:response.email,name:response.name});
        if(ch){
            const data=await ContactForm.create(response);
            res.status(200).json({message:"Successfully Submited"});
        }
        else{
            res.status(200).json({message:"invalid email id"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
const forgot=async (req,res)=>{
    try{
        const x=req.body;
        const newpwd=await bcrypt.hash(x.password,10);
        const upd=await emp.updateOne({_id:x._id},{$set:{password:newpwd}});
        //console.log(upd);
        if(upd.acknowledged)
            res.status(200).json({msg:"password update successfully"});
        else{
            res.status(200).json({msg:"invalid id"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}
module.exports={register,login,details,quali,qualidetails,contact,forgot};