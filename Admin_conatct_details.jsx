import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./admin_contact.css";
export const Contact_details=()=>{
    const [user,setUser]=useState([]);
    const navi=useNavigate();
    const token=localStorage.getItem("token");
    const getAllData=async ()=>{
        try{
            const response=await fetch("http://localhost:4000/admin/contact_details",{
                method:"GET",
                headers:{Authorization:`bearer ${token}`}
            });
            //console.log(response);
            if(response.status==200){
                const data=await response.json();
                //console.log(data);
                setUser(data);
            }
        }
        catch(error){
            Swal.fire({
                text:"Something Went Wrong",
                icon:"error",
                background:"wheat"
            })
        }
    }
    useEffect(()=>{
        getAllData();
    },[]);
    const func=()=>{
        navi("/admin/basic");
    }
    const delFunc=async (email)=>{
        const token=localStorage.getItem("token");
        try{
            const response=await fetch(`http://localhost:4000/admin/delete/user/contact/${email}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.status==200){
                const result=await response.json();
                Swal.fire({
                    text:result.msg,
                    icon:"success",
                    background:"wheat"
                })
                getAllData();
            }
        }
        catch(error){
            Swal.fire({
                text:"error",
                icon:"error",
                background:"wheat"
            })
        }
    }
    return(
        <>
        <div className="total">
        <div className="main">
            <h1><u>RS GROUP OF COMPANIES</u></h1>
            <img src="../images/contactUs.jpg"/>
        </div>
        <div className="tablecontact">
            <h3><center>Contact Details</center></h3>
            <table border="1.3">
                <tr>
                    <th>ID</th>
                    <th>EMAIL</th>
                    <th>NAME</th>
                    <th>MESSAGE</th>
                    <th>DELETE</th>
                </tr>
                {
                    user.map((cur,index)=>{
                        return(
                            <>
                            <tr key={index}>
                                <td>{cur._id}</td>
                                <td>{cur.email}</td>
                                <td>{cur.name}</td>
                                <td>{cur.message}</td>
                                <td><button onClick={()=>delFunc(cur.email)}>Delete</button></td>
                            </tr>
                            </>
                        );
                    })
                }
            </table>
        </div>
        <button onClick={func}>BACK</button>
        </div>
        </>
    )
}