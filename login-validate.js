const {z}=require("zod");
const loginSchema=z.object({
    email:z
    .string({required_error:"email can't be empty"})
    .trim()
    .max(50,{message:"email must be maximum 50 letters"})
    .min(10,{message:"email must be atleast 10 letters"}),
    password:z
    .string({required_error:"password can't be empty"})
    .trim()
    .min(6,{message:"password must be minimum 6 letters"})
    .max(20,{message:"password must be maximum 20 letters"})
})
module.exports=loginSchema;