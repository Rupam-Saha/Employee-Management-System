import Heading from "./Heading";
import "./navbar1.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Navbar1=()=>{
    const navigate=useNavigate();
    function logout(){
        Swal.fire({
            text:"Are you want to logout??",
            icon:"question",
            background:"black",
            showCancelButton:true,
            showConfirmButton:true,
            confirmButtonText:"Yes"
        }).then((x)=>{
            if(x.isConfirmed){
                localStorage.removeItem("token");
                navigate("/user");
            }
        })
    }
    function contact(){
        navigate("/contact")
    }
    function perso(){
        navigate("/personal_details")
    }
    function about(){
        navigate("/about")
    }
    return(
        <>
        <Heading/>
        <div className="nav1">
            <ul>
                <li onClick={about}>ABOUT</li>
                <li onClick={perso}>PERSONAL DETAILS</li>
                <li onClick={contact}>CONTACT</li>
                <li onClick={logout}>LOGOUT</li>
            </ul>
        </div>
        </>
    )
}