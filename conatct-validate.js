const {z}=require("zod");
const conatctvalidate=z.object({
    message:z
    .string({required_error:"message can't be empty"})
    .trim()
    .min(1,{message:"message can't be less than 1 letter"})
});
module.exports=conatctvalidate;