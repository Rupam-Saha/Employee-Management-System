import "./register.css";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
const Register=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
        name:"",
        email:"",
        number:"",
        address:"",
        dob:"",
        joining_year:"",
        password:""
    });
    const changeVal=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setUser({
            ...user,            
            [nm]:val
        });
    }
    const sumbitfunc=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:4000/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            }
            )
            const data=await response.json();
            //console.log(response);
            if(response.status==200){
                setUser({
                    name:"",
                    email:"",
                    number:"",
                    address:"",
                    dob:"",
                    joining_year:"",
                    password:""           
                })
                //alert(data.msg)
                //console.log(data.token);
                Swal.fire({
                    title:"Successful",
                    text:data.msg,
                    icon:"success",
                    background:"wheat"
                })
                localStorage.setItem("token",data.token);
                navigate("/qualificationdetails");
            }
            else{
                //alert(data);
                Swal.fire({
                    title:"Something Went Wrong",
                    text:data,
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
    const func1=()=>{
        navigate("/user");
    }
    return (
        <>
            <div className="details">
            <h1 id="heading">RS GROUP OF COMPANIES</h1>
            <div className="xy">
            <img src="/images/register.jpg"/>
            <div className="form1">
                <div className="A1">
                    <p>NAME</p>
                    <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={user.name}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>EMAIL</p>
                    <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    value={user.email}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>NUMBER</p>
                    <input
                    type="text"
                    placeholder="Enter your number"
                    name="number"
                    value={user.number}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>ADDRESS</p>
                    <input
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={user.address}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>DOB</p>
                    <input
                    type="text"
                    placeholder="Enter your dob"
                    name="dob"
                    value={user.dob}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>JOINING YEAR</p>
                    <input
                    type="text"
                    placeholder="Enter your Joining year"
                    name="joining_year"
                    value={user.joining_year}
                    onChange={changeVal}
                    />
                </div>
                <div className="A1">
                    <p>PASSWORD</p>
                    <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={user.password}
                    onChange={changeVal}
                    />
                </div>
            </div>
            </div>
            <div className="b1">
                <button onClick={sumbitfunc}>SUBMIT</button>
                <button onClick={func1}>BACK</button>
            </div>
        </div>
        </>
    )
}
export default Register;