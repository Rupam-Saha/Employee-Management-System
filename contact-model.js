const mongoose=require("mongoose");
const form=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
});
const ContactForm=mongoose.model("contact",form);
module.exports=ContactForm;