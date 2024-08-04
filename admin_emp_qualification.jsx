import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./admin_emp_details.css";
export const Emp_qualification=()=>{
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    const [users,setUsers]=useState([]);
    const getData=async ()=>{
        try{
            const response=await fetch("http://localhost:4000/admin/empQualification",{
                method:"GET",
                headers:{Authorization:`bearer ${token}`}
            });
            if(response.status==200){
                const data=await response.json();
                //console.log(data);
                setUsers(data);
            }
            else{
                //alert("can't get data");
                Swal.fire({
                    text:"can't get data",
                    icon:"error",
                    background:"wheat"
                })
            }
        }
        catch(error){
            //alert(error);
            Swal.fire({
                text:"error",
                background:"wheat",
                icon:"error"
            })
        }
    }    
    useEffect(()=>{
        getData();
    },[]);
    const func1=()=>{
        navigate("/admin/basic");
    }
    const delfunc=async (email)=>{
        Swal.fire({
           text:"Are you sure want to delete???",
           icon:"question",
           background:"wheat",
           showCancelButton:true,
           showConfirmButton:true,
           confirmButtonText:"Yes",
           cancelButtonText:"No"
        }).then((x)=>{
            if(x.isConfirmed){
                xy(email);
            }
        })
    }
    const xy=async (email)=>{
        const token=localStorage.getItem("token");
        try{
            const response=await fetch(`http://localhost:4000/admin/delete/user/qualification/${email}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.status==200){
                const result=await response.json();
                //alert(result.msg);
                Swal.fire({
                    text:result.msg,
                    icon:"success",
                    background:"wheat"
                })
                getData();
                delDetails(email);//this func is to delete employee's information   
            }
            else{
                //alert("problem occured");
                Swal.fire({
                    text:"problem occured",
                    icon:"error",
                    background:"wheat"
                })
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
    const delDetails=async (email)=>{
        const token=localStorage.getItem("token");
        try{
            const response=await fetch(`http://localhost:4000/admin/delete/user/${email}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.status==200){
                //const data=await response.json();
                //alert(data.msg);
                getData();
            }
        }
        catch(error){
            alert(error);
        }
    }
    const editQuali=(id)=>{
        navigate(`/admin/edit/qualifiaction/${id}`);
    }
    return(
        <>
        <div className="total">
        <div className="main">
            <h1>RS GROUP OF COMPANIES</h1>
            <img src="../images/empdetails.png"/>
        </div>
        <div className="tableemp">
            <h3>Employee Qualifications</h3>
            <table border="1.3">
                <tr>
                    <th>ID</th>
                    <th>EMAIL</th>
                    <th>SCHOOL</th>
                    <th>COLLEGE</th>
                    <th>QUALIFIACTION</th>
                    <th>PASSING YEAR</th>
                    <th>EXPERIENCE</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
                {
                    users.map((current,index)=>{
                        return(
                            <tr key={index}>
                                <td>{current._id}</td>
                                <td>{current.email}</td>
                                <td>{current.school}</td>
                                <td>{current.college}</td>
                                <td>{current.qualification}</td>
                                <td>{current.passing_year}</td>
                                <td>{current.experience}</td>
                                <td><button onClick={()=>editQuali(current._id)}>EDIT</button></td>
                                <td><button onClick={()=>delfunc(current.email)}>DELETE</button></td>
                            </tr>
                        );
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