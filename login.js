const loginSchema=require("../validation/login-validate");

const x=()=>async (req,res,next)=>{
    try{
        const ch=await loginSchema.parseAsync(req.body);
        next();
    }
    catch(error)
    {
        const err=error.issues[0];
        res.status(400).json(err);
    }
}
module.exports=x;