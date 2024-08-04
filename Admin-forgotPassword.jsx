import "./admin-forgotpwd.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Admin_forgot_password=()=>{
    const navigate=useNavigate();
    const [user,setuser]=useState({
        _id:"",
        password:""
    });
    const changeFunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setuser({
            ...user,
            [nm]:val
        });
    }
    const updFunc=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:4000/admin/forgotPassword",{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            });
            if(response.status==200){
                const result=await response.json();
                //alert(result.msg);
                Swal.fire({
                    text:result.msg,
                    icon:"success",
                    background:"wheat"
                })    
                navigate("/admin/login");
            }
        }
        catch(error){
            //alert(error);
            Swal.fire({
                text:"error",
                icon:"error",
                background:"wheat"
            })
        }
    }
    const func=()=>{
        navigate("/admin/login");
    }
    return(
        <>
        <div className="tri">
            <h1><u>RS GROUP OF COMPANIES</u></h1>
            <div className="mon">
                <div className="id">
                    <p>ID</p>
                    <input
                    type="text"
                    placeholder="Enter your id"
                    name="_id"
                    value={user._id}
                    onChange={changeFunc}
                    />
                </div>
                <div className="pwd">
                    <p>PASSWORD</p>
                    <input
                    type="password"
                    placeholder="Enter your new password"
                    name="password"
                    value={user.password}
                    onChange={changeFunc}
                    />
                </div>
            </div>
            <div className="bu">
                <button onClick={updFunc}>UPDATE</button>
                <button onClick={func}>BACK</button>
            </div>
        </div>
        </>
    )
}