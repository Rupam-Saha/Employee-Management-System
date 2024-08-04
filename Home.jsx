import { useNavigate } from "react-router-dom";
import "./home.css";
export const Home=()=>{
    const navigate=useNavigate();
    function gotouser(){
        navigate("/user");
    }
    function gotoadmin(){
        navigate("/admin/login");
    }
    return (
        <>
        <h1 id="heading">RS GROUP OF COMPANIES</h1>
        <div className="about">
            <img src="../images/company.jpg" alt="RS_company"/>
            <pre>RS group of Companies are one of the highly circulated it company<br/>
            in INDIA .it actually maintain the oversees use of devices storing,
            <br/> retrieving, and sending information.<b>MR. Rupam Saha</b> who build this company 
            <br/>in 2029 .
            </pre>
            <h3>ARE YOU ???</h3>
            <div className="btn">
                <button id="user" onClick={gotouser}>USER</button>
                <button id="admin" onClick={gotoadmin}>ADMIN</button>
            </div>
      </div>
        </>
    )
}