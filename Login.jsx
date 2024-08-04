import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Login=()=>{
    const navigate=useNavigate();
    const [user,checkUser]=useState({
        email:"",
        password:""
    })
    const changeFunc=(e)=>{
        let nm=e.target.name;
        let value=e.target.value;

        checkUser({
            ...user,
            [nm]:value
        })
    }
    const checkFunc=async (e)=>{
        e.preventDefault();
        
        try{
            const response=await fetch("http://localhost:4000/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            })
            const data=await response.json();
            if(response.ok){
                //alert(data.message);
                Swal.fire({
                    title:"Successful",
                    text:data.message,
                    icon:"success",
                    background:"wheat"
                });    
                checkUser({
                    email:"",
                    password:""
                })
                localStorage.setItem("token",data.token);
                navigate("/basic");       
            }
            else{
                //alert(data.message);
                Swal.fire({
                    title:"Failed",
                    text:data.message,
                    icon:"error",
                    background:"wheat"
                })
            }
        }
        catch(error){
            //alert("can't login");
            Swal.fire({
                title:"Something Went Wrong",
                text:"Failed to login",
                icon:"error",
                background:"black"
            })
        }     
    }
    const func1=()=>{
        navigate("/user");
    }
    const func2=()=>{
        navigate("/forgot_password");
    }
    return(
        <>
        <div className="login">
            <h1 id="heading">RS GROUP OF COMPANIES</h1>
            <img src="/images/login.jpg"/>
            <div className="logForm">
                <div id="email">
                    <span>EMAIL</span>
                    <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    value={user.email}
                    onChange={changeFunc}
                    />
                </div>
                <div id="pass">
                    <span>PASSWORD</span>
                    <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={user.password}
                    onChange={changeFunc}
                    />
                </div>
            </div>
            <div className="bt1">
                <button onClick={checkFunc}>LOGIN</button>
                <button onClick={func1}>BACK</button>
                <button onClick={func2}>FORGOT PASSWORD</button>
            </div>
        </div>
        </>
    )
}
export default Login;