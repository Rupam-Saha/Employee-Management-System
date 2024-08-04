const {z}=require("zod");
const valSchema=z.object({
    name:z
    .string({required_error:"name cann't be empty"})
    .trim()
    .max(50,{message:"name cann't be more than 50 letters"})
    .min(5,{message:"name must be atleast 5 letters"}),
    email:z
    .string({required_error:"email cann't be empty"})
    .email({message:"invalid email address"})
    .trim()
    .max(25,{message:"email can't be more than 25 letters"})
    .min(5,{message:"email must be atleast 5 letters"}),
    number:z
    .string({required_error:"number cann't be empty"})
    .trim()
    .max(12,{message:"number cann't be more than 12 letters"})
    .min(10,{message:"number must be atleast 10 letters"}),
    address:z
    .string({required_error:"address cann't be empty"})
    .trim()
    .max(50,{message:"address cann't be more than 50 letters"})
    .min(5,{message:"address must be atleast 5 letters"}),
    dob:z
    .string({required_error:"date of birth cann't be empty"})
    .trim()
    .max(10,{message:"date of birth cann't be more than 10 letters"})
    .min(10,{message:"date of birth must be atleast 10 letters"}),
    password:z
    .string({required_error:"password cann't be empty"})
    .trim()
    .max(25,{message:"password cann't be more than 25 letters"})
    .min(6,{message:"password must be atleast 6 letters"})
});
module.exports=valSchema;