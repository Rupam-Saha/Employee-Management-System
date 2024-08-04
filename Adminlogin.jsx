import "./admin_login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
export const Admin=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:""
    });
    const changeval=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setUser({
            ...user,
            [nm]:val
        })
    }
    const func1=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:4000/admin/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            })
            const result=await response.json();
            //console.log(result);
            if(response.status==200){
                //alert(result.msg);
                Swal.fire({
                    title:"Success",
                    text:result.msg,
                    icon:"success",
                    background:"wheat"
                })
                localStorage.setItem("token",result.token);
                navigate("/admin/basic");
            } 
            else{
                //alert(result);
                Swal.fire({
                    title:"Failed",
                    text:result.msg,
                    icon:"error",
                    background:"wheat"
                })
            }
        }
        catch(error){
            //alert("can't login");
            Swal.fire({
                text:"failed",
                icon:"error",
                background:"wheat"
            })
        }
    }
    const func2=()=>{
        navigate("/");
    }
    const func3=()=>{
        navigate("/admin/forgot_password");
    }
    return (
        <>
        <h1 id="heading">RS GROUP OF COMPANIES</h1>
        <div className="xy">
        <img src="../images/admin.jpg" />
        <div className="form1">
            <div className="email1">
                <p>Email</p>
                <input
                type="email"
                name="email"
                placeholder="Enter Email Id"
                value={user.email}
                onChange={changeval}
                />
            </div>
            <div className="password1">
                <p>Password</p>
                <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={changeval}
                />
            </div>
        </div>
        </div>
        <div className="btun">
            <button onClick={func1}>LOGIN</button>
            <button onClick={func2}>BACK</button>
            <button onClick={func3}>FORGOT PASSWORD</button>
        </div>
        </>
    )
}