import "./edit_emp_details.css";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
//useParams is used to get parameter from url
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Edit_emp_details=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({});
    const {id}=useParams();
    const getInfo=async (id)=>{
        try{
            const response=await fetch(`http://localhost:4000/admin/emp/details/${id}`,{
                method:"GET"
            });
            //console.log(response);
            if(response.status==200){
                const data=await response.json();
                //console.log(data);
                setUser(data);
            }
            else{
                //alert("problem occurred");
                Swal.fire({
                    title:"Failed",
                    text:"Problem Occured",
                    icon:"error",
                    background:"wheat"
                })
            }
        }
        catch(error){
            //alert(error);
            Swal.fire({
                title:"error",
                icon:"error",
                background:"wheat"
            })
        }
    }
    useEffect(()=>{
        getInfo(id);
    },[]);
    const changeFunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setUser({
            ...user,
            [nm]:val
        });
    }
    const updateFunc=(e)=>{
        e.preventDefault();
        Swal.fire({
            title:"Update",
            text:"Are You Sure??",
            icon:"question",
            showConfirmButton:true,
            showCancelButton:true,
            confirmButtonText:"Yes",
            cancelButtonText:"No",
            background:"wheat"
        }).then((x)=>{
            if(x.isConfirmed){
                doUpdate();
            }
            else{
                getInfo(id);
            }
        })
    }
    const doUpdate=async ()=>{
        try{
            //console.log(id);
            const response=await fetch(`http://localhost:4000/admin/emp/update/${id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            });
            const result=await response.json();
            if(response.status==200){
                //alert(result.msg);
                Swal.fire({
                    title:"Success",
                    text:result.msg,
                    icon:"success",
                    background:"wheat"
                })
                getInfo(id);
            }
            else{
                Swal.fire({
                    title:"Failed",
                    text:result,
                    icon:"error",
                    background:"wheat"
                })
            }
        }
        catch(error){
            //alert(error);
            Swal.fire({
                title:"Failed",
                icon:"error",
                background:"wheat"
            })
        }
    }
    const func=()=>{
        navigate("/admin/emp_details");
    }
    return(
        <>
        <div className="main">
        <h2><u>EDIT YOUR DETAILS</u></h2>
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
            <div className="name">
                <p>NAME</p>
                <input
                type="text"
                name="name"
                value={user.name}
                onChange={changeFunc}
                />
            </div>
            <div className="number">
                <p>NUMBER</p>
                <input
                type="text"
                name="number"
                value={user.number}
                onChange={changeFunc}
                />
            </div>
            <div className="address">
                <p>ADDRESS</p>
                <input
                type="text"
                name="address"
                value={user.address}
                onChange={changeFunc}
                />
            </div>
            <div className="dob">
                <p>DATE OF BIRTH</p>
                <input
                type="text"
                name="dob"
                value={user.dob}
                onChange={changeFunc}
                />
            </div>
        </div>
        <div className="btn">
        <button onClick={updateFunc}>UPDATE</button>
        <button onClick={func}>BACK</button>
        </div>
        </div>
        </>
    )
}