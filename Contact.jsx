import "./contact.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const token=localStorage.getItem("token");
export const Contact=()=>{
    const navigate=useNavigate();
    const [user,setuser]=useState({});
    const getdata=async()=>{
        try{
            const x=await fetch("http://localhost:4000/details",{
                method:"GET",
                headers:{Authorization:`Bearer ${token}`}
            });
            if(x.status==200){
            const y=await x.json();
            //console.log(y);
            setuser(y);    
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getdata();
    },[]);
    const setvalue=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setuser({
            ...user,
            [nm]:val
        });
    }
    const senddata=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:4000/contact",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            })
            console.log(response);
            const data=await response.json();
            if(response.status==200){
                //alert("Successfully sumbited");
                Swal.fire({
                    title:"success",
                    text:"Successfully submited",
                    icon:"success",
                    background:"wheat"
                })
                setuser({
                    message:""
                })
            }
            else{
                //alert(data);
                Swal.fire({
                    text:"failed",
                    title:data,
                    icon:"error",
                    background:"wheat"
                })

            }    
        }
        catch(error){
            //alert(error);
            Swal.fire({
                text:"something went wrong",
                title:"failed",
                icon:"error",
                background:"wheat"
            })

        }
    }
    const xyz=()=>{
        navigate("/basic");
    }
    return (
        <>
        <div className="contactform">
        <h1><u>RS GROUP OF COMPANIES</u></h1>
        <div className="abc">
            <img src="../images/contact1.png" alt="conatct logo"/>
            <div className="form">
                <div className="eml">
                    <p>EMAIL</p>
                    <input
                    type="email"
                    name="email"
                    value={user.email}
                    />
                </div>
                <div className="name">
                    <p>NAME</p>
                    <input
                    type="text"
                    name="name"
                    value={user.name}
                    />
                </div>
                <div className="msg">
                    <p>MESSAGE</p>
                    <input
                    type="text"
                    name="message"
                    placeholder="Enter Your Message"
                    value={user.message}
                    onChange={setvalue}
                    />
                </div>
            </div>
        </div>
        <div className="btn">
        <button onClick={senddata}>SUBMIT</button>
        <button onClick={xyz}>BACK</button>
        </div>
        </div>
        </>
    )
}