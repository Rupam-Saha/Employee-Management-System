const adminLoginModel=require("../validation/adminLogin-validate");
const check=()=>async (req,res,next)=>{
    try{
        const a=await adminLoginModel.parseAsync(req.body);
        next();
    }
    catch(error){
        const err=error.issues[0].message;
        res.status(400).json(err);
    }
}
module.exports=check;