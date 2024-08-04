const mongoose=require("mongoose");
const x=new mongoose.Schema({
    year:{
        type:String,
        unique:true,
        required:true
    },
    number_of_employees:{
        type:Number,
        required:true
    }
})
const statSchema=mongoose.model("Statistic",x);
module.exports=statSchema;