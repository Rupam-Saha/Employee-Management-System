const conatctvalidate=require("../validation/conatct-validate");
const checkContactValid=()=>async(req,res,next)=>{
    try{
        const x=await conatctvalidate.parseAsync(req.body);
        next();
    }
    catch(error){
        const err=error.issues[0].message;
       res.status(400).json(err);
    }
}
module.exports=checkContactValid;