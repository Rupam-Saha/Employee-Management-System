const {z}=require("zod");
const adminLoginModel=z.object({
    email:z
    .string({required_error:"email cann,t be empty"})
    .trim()
    .min(15,{message:"email can't be less than 15 letters"}),
    password:z
    .string({required_error:"password cann,t be empty"})
    .trim()
    .min(5,{message:"password can't be less than 5 letters"})
});
module.exports=adminLoginModel;