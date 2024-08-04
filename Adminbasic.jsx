import "./adminbasic.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Adminbasic=()=>{
    const navi=useNavigate();
    const func1=()=>{
        navi("/admin/emp_details");
    }
    const func2=()=>{
        navi("/admin/emp_qualifications");
    }
    const func3=()=>{
        Swal.fire({
            text:"are you sure want to logout??",
            icon:"question",
            background:"wheat",
            showConfirmButton:true,
            showCancelButton:true,
            confirmButtonText:"yes",
            cancelButtonText:"No"
        }).then((x)=>{
            if(x.isConfirmed){
                localStorage.removeItem("token");
                navi("/");
            }
        })
    }
    const func4=()=>{
        navi("/admin/contact-details");
    }
    const func5=()=>{
        navi("/admin/stat-details");
    }
    return (
        <>
        <h1 id="heading">RS GROUP OF COMPANIES</h1>
        <div className="main1">
        <div className="pic">
            <img src="../images/admincontroll.jpg" />
        </div>
        <div className="list">
            <ol>
                <li onClick={func1}>Show All Employees Details</li>
                <li onClick={func2}>Show All Employees qualifications</li>
                <li onClick={func4}>Show All Contacts Information</li>
                <li onClick={func5}>Statistics</li>
                <li onClick={func3}>Logout</li>
            </ol>
        </div>
        </div>
        </>
    )
}