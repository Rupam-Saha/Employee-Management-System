import "./edit_emp_quali.css";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Edit_emp_quali=()=>{
    const [user,setUser]=useState({});
    const {id}=useParams();
    const navigate=useNavigate();
    const getAllData=async (id)=>{
        try{
            const response=await fetch(`http://localhost:4000/admin/emp/qualification/${id}`,{
                method:"GET"
            });
            if(response.status==200){
                const data=await response.json();
                //console.log(data);
                setUser(data);
            }
        }
        catch(error){
            Swal.fire({
                text:"Something Went Wrong",
                background:"wheat",
                icon:"error"
            })
        }
    }
    useEffect(()=>{
        getAllData(id);
    },[])
    const changeFunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;
        setUser({
            ...user,
            [nm]:val
        });
    }
    const updFunc=async (e)=>{
        e.preventDefault();
        try{
            const respon=await fetch(`http://localhost:4000/admin/emp/update/qualification/${id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            });
            if(respon.status==200){
                const data=await respon.json();
                //alert(data.msg);
                Swal.fire({
                    text:data.msg,
                    icon:"success",
                    background:"wheat"
                })
                getAllData(id);
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
        navigate("/admin/emp_qualifications");
    }
    return(
        <>
        <div className="main">
        <h2><u>EDIT YOUR QUALIFIACTION DETAILS</u></h2>
        <div className="info">
            <div className="email">
                <p>EMAIL</p>
                <input
                type="email"
                name="email"
                value={user.email}
                onChange={changeFunc}
                />
            </div>
            <div className="school">
                <p>SCHOOL</p>
                <input
                type="text"
                name="school"
                value={user.school}
                onChange={changeFunc}
                />
            </div>
            <div className="college">
                <p>COLLEGE</p>
                <input
                type="text"
                name="college"
                value={user.college}
                onChange={changeFunc}
                />
            </div>
            <div className="qualific">
                <p>QUALIFIACTION</p>
                <input
                type="text"
                name="qualification"
                value={user.qualification}
                onChange={changeFunc}
                />
            </div>
            <div className="pass">
                <p>PASSING YEAR</p>
                <input
                type="text"
                name="passing_year"
                value={user.passing_year}
                onChange={changeFunc}
                />
            </div>
            <div className="exp">
                <p>EXPERIENCE</p>
                <input
                type="text"
                name="experience"
                value={user.experience}
                onChange={changeFunc}
                />
            </div>
        </div>
        <div className="btn">
        <button onClick={updFunc}>UPDATE</button>
        <button onClick={func}>BACK</button>
        </div>
        </div>
        </>
    )
}