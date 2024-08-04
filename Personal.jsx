import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./personal.css";
export const Personal=()=>{
    const [user,setuser]=useState({});
    const navigate=useNavigate();
    const backFunc=()=>{
        navigate("/basic");
    }
    const setValue=async ()=>{
        const token=localStorage.getItem("token");
        try{
            const response=await fetch("http://localhost:4000/details",{
                method:"GET",
                headers:{Authorization:`Bearer ${token}`}
            });
            const data=await response.json();    
            if(response.ok){
            //console.log(data);
            setuser(data);
            }
            else{
                Swal.fire({
                    text:data.msg,
                    icon:"error",
                    background:"wheat"
                })
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        setValue()
    },[]);
    return (
        <>
        <div className="details">
            <h1 id="heading">RS GROUP OF COMPANIES</h1>
            <div className="main2">
                <img src="/images/per.png"></img>
                <div className="x">
                <div className="A1">
                    <p>NAME</p>
                    <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={user.name}
                    />
                </div>
                <div className="A1">
                    <p>EMAIL</p>
                    <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    value={user.email}
                    />
                </div>
                <div className="A1">
                    <p>NUMBER</p>
                    <input
                    type="text"
                    placeholder="Enter your number"
                    name="number"
                    value={user.number}
                    />
                </div>
                <div className="A1">
                    <p>ADDRESS</p>
                    <input
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={user.address}
                    />
                </div>
                <div className="A1">
                    <p>DOB</p>
                    <input
                    type="text"
                    placeholder="Enter your dob"
                    name="dob"
                    value={user.dob}
                    />
                </div>
            </div>
        </div>
        <button onClick={backFunc}>BACK</button>
        </div>
        </>
    )
}