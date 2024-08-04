import "../pages/admin_emp_details.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin_emp_details.css";
import Swal from "sweetalert2";
export const Emp_details=()=>{
    const navigate=useNavigate();
    //blank array parameter e pass korlam because ami jani na kota array ache amr kache.
    const [user,setUser]=useState([]);
    const token=localStorage.getItem("token");
    const deleteUser=async (email)=>{
        Swal.fire({
            text:"Are you Sure Want to delete??",
            icon:"question",
            showCancelButton:true,
            showConfirmButton:true,
            confirmButtonText:"Yes",
            cancelButtonText:"No",
            background:"wheat"
        }).then((x)=>{
            if(x.isConfirmed){
                xyz(email);
            } 
        })
    }
    const xyz=async (email)=>{
        try{
            //console.log(id);
            const response=await fetch(`http://localhost:4000/admin/delete/user/${email}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.status==200){
                const data=await response.json();
                //alert(data.msg);
                Swal.fire({
                    text:data.msg,
                    icon:"success",
                    background:"wheat"
                })
                getData();
                delQuali(email);//for delete this employee from qualification collection
            }        
        }
        catch(error){
            //alert(error);
            Swal.fire({
                text:"Error",
                background:"wheat",
                icon:"error"
            })
        }

    }
    const getData=async ()=>{
        try{
            const response=await fetch("http://localhost:4000/admin/empDetails",{
                method:"GET",
                headers:{Authorization:`BEARER ${token}`}
            });
            if(response.status==200){
                const result=await response.json();
                setUser(result);
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
    useEffect(()=>{
        getData()
    },[]);
    const func1=()=>{
        navigate("/admin/basic");
    }
    const editFunc=(id)=>{
        navigate(`/admin/edit/details/${id}`);
    }
    const delQuali=async (email)=>{
        try{
            //console.log(id);
            const response=await fetch(`http://localhost:4000/admin/delete/user/qualification/${email}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.status==200){
                const data=await response.json();
                //alert(data.msg);
                Swal.fire({
                    text:data.msg,
                    icon:"success",
                    background:"wheat"
                })
                getData();
            }
        }
        catch(error){
            Swal.fire({
                text:"something went wrong",
                icon:"error",
                background:"wheat"
            })
        }
    }
    return(
        <>
        <div className="total">
        <div c
        lassName="main">
            <h1><center>RS GROUP OF COMPANIES</center></h1>
            <img src="../images/empdetails.png"/>
        </div>
        <div className="tableemp">
            <h3>Employee Details</h3>
            <table border="1.3">
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>NUMBER</th>
                    <th>ADDRESS</th>
                    <th>DOB</th>
                    <th>JOINING YEAR</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
                {
                    user.map((curEle,index)=>{
                        return(<tr key={index} >
                            <td>{curEle._id}</td>
                            <td>{curEle.name}</td>
                            <td>{curEle.email}</td>
                            <td>{curEle.number}</td>
                            <td>{curEle.address}</td>
                            <td>{curEle.dob}</td>
                            <td>{curEle.joining_year}</td>
                            <td><button onClick={()=>editFunc(curEle._id)}>EDIT</button></td>
                            <td><button onClick={()=>deleteUser(curEle.email)}>DELETE</button></td>
                        </tr>);
                    })
                }
            </table>
            <div className="btn">
                <button onClick={func1}>BACK</button>
            </div>
        </div>
        </div>
        </>
    )
}
