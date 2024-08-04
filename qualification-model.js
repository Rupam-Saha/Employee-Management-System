const mongoose=require("mongoose");
const qualificSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    school:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    passing_year:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    }
});
const qualiSchema=mongoose.model("qualification",qualificSchema);
module.exports=qualiSchema;