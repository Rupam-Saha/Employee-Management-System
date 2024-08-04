import "./forgot.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Forgot_password=()=>{
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
    const func=()=>{
        navigate("/login");
    }
    const updateFunc=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:4000/forgot_password",{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            })
            if(response.status==200){
                const data=await response.json();
                //alert(data.msg);
                Swal.fire({
                    text:data.msg,
                    icon:"success",
                    background:"wheat"
                })
                navigate("/login");
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
    return(
        <>
        <div className="a">
            <h1><u><center>RS GROUP OF COMPANIES</center></u></h1>
        <div className="body">
            <div className="id">
                <p>ID</p>
                <input
                type="text"
                placeholder="Enter your ID"
                name="_id"
                value={user._id}
                onChange={changeFunc}
                />
            </div>
            <div className="newpwd">
                <p>NEW PASSWORD</p>
                <input
                type="text"
                placeholder="Enter your new password"
                name="password"
                value={user.password}
                onChange={changeFunc}
                />
            </div>
        </div>
        <div className="bt">
        <button onClick={updateFunc}>UPDATE</button>
        <button onClick={func}>BACK</button>
        </div>
        </div>
        </>
    )
}