const express=require("express");
const r=require("./router/auth-route");
const x=require("./router/admin-route");
const con=require("./connection/connectdb");
const cors=require("cors");
const app=express();
const port=4000;
const corsOption={
    origin:"http://localhost:5173",
    methods:"GET,POST,UPDATE,PUT,PATCH,HEAD,DELETE",
    Credential:true
}
app.use(cors(corsOption));
app.use(express.json());
app.use("/",r);
app.use("/admin",x);
con().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at ${port}`);
    })
});