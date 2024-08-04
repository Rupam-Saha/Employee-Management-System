const {z}=require("zod");
const qualivalidate=z.object({
    email:z
    .string({required_error:"email feild can't be empty"})
    .trim()
    .max(30,{message:"email can't be more than 20 letters"})
    .min(10,{message:"email can't be less than 10 letters"}),
    school:z
    .string({required_error:"school feild can't be empty"})
    .trim()
    .max(40,{message:"school name can't be more than 40 letters"})
    .min(2,{message:"school name can't be less than 2 letters"}),
    college:z
    .string({required_error:"college feild can't be empty"})
    .trim()
    .max(50,{message:"college name can't be more than 40 letters"})
    .min(15,{message:"college name can't be less than 15 letters"}),
    qualification:z
    .string({required_error:"qualification feild can't be empty"})
    .trim()
    .max(40,{message:"qualification name can't be more than 40 letters"})
    .min(2,{message:"qualifiaction name can't be less than 2 letters"}),
    passing_year:z
    .string({required_error:"department feild can't be empty"})
    .trim()
    .max(4,{message:"department name can't be more than 4 letters"})
    .min(4,{message:"department name can't be less than 4 letters"}),
    experience:z
    .string({required_error:"salary feild can't be empty"})
    .trim()
    .max(15,{message:"salary amount can't be more than 15 letters"})
    .min(5,{message:"salary amount can't be less than 5 letters"})
})
module.exports=qualivalidate;