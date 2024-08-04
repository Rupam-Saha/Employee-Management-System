import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Qualificationdetails=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        school:"",
        college:"",
        qualification:"",
        passing_year:"",
        experience:""
    });
    const changeVal=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setUser({
            ...user,
            [nm]:val
        });
    }
    const submitfunc=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:4000/qualification",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            })
            console.log(response);
            const result=await response.json();
            //console.log(result);
            if(response.status==200){
                //alert(result.msg);
                Swal.fire({
                    title:"Successful",
                    text:result.msg,
                    icon:"success",
                    background:"wheat"
                })
                setUser({
                    email:"",
                    school:"",
                    college:"",
                    qualification:"",
                    passing_year:"",
                    experience:""
                });
                navigate("/login");
            }
            else{
                //alert(result);
                Swal.fire({
                    title:"Failed",
                    text:result,
                    icon:"error",
                    background:"wheat"
                })
                navigate("/register");
            }
        }
        catch(error)
        {
            //alert(error);
            Swal.fire({
                title:"Error",
                text:"Something Went Wrong",
                icon:"error",
                background:"wheat"
            })
        }
    }
    return (
        <>
        <div className="details">
            <h1 id="heading">RS GROUP OF COMPANIES</h1>
            <div className="xy">
            <img src="/images/quali.jpg"/>
            <div className="form1">
                <div className="A1">
                    <p>EMAIL</p>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={user.email}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>SCHOOL</p>
                    <input
                    type="text"
                    placeholder="Enter your school name"
                    name="school"
                    value={user.school}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>COLLEGE</p>
                    <input
                    type="text"
                    placeholder="Enter your college name"
                    name="college"
                    value={user.college}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>QUALIFICATION</p>
                    <input
                    type="text"
                    placeholder="Enter your qualification"
                    name="qualification"
                    value={user.qualification}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>PASSING YEAR</p>
                    <input
                    type="text"
                    placeholder="Enter your passing year"
                    name="passing_year"
                    value={user.passing_year}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>EXPERIENCE</p>
                    <input
                    type="text"
                    placeholder="Enter your experience year"
                    name="experience"
                    value={user.experience}
                    onChange={changeVal}
                    />
                </div>
            </div>
            </div>
            <div className="b1">
                <button onClick={submitfunc}>REGISTER NOW</button>
            </div>
        </div>
        </>
    )
}