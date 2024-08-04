import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./about.css";
export const About=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({});
    function gotoback(){
        navigate("/basic");
    }
    const token=localStorage.getItem("token");
    const setvalue=async()=>{
        const response=await fetch("http://localhost:4000/qualificationget",{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`}
        });
        const data=await response.json();
        //console.log(data);
        setUser(data.data);
    }
    useEffect(()=>{
        setvalue();
    },[])
    return (
        <>
        <div className="info1">
        <h1><u>RS GROUP OF COMPANIES</u></h1>
        </div>
        <div className="quali">
        <img src="../images/qualifications.webp"/>
            <div className="x">
            <div className="school">
                <p>SCHOOL NAME</p>
                <input
                type="text"
                value={user.school}
                />
            </div>
            <div className="college">
                <p>COLLEGE NAME</p>
                <input
                type="text"
                value={user.college}
                />
            </div>
            <div className="qualification">
                <p>QUALIFICATION</p>
                <input
                type="text"
                value={user.qualification}
                />
            </div>
            <div className="py">
                <p>PASSING YEAR</p>
                <input
                type="text"
                value={user.passing_year}
                />
            </div>
            <div className="exp">
                <p>EXPERIENCE</p>
                <input
                type="text"
                value={user.experience}
                />
                </div>
            </div>
        </div>
        <div className="btn">
            <button onClick={gotoback}>BACK</button>
        </div>
        </>
    )
}