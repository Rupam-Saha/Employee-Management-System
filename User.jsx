import Heading from "../Navbar/Heading";
import { useNavigate } from "react-router-dom";
import "./user.css";
const User=()=>{
        const nav=useNavigate();
        const logFunc=()=>{
            nav("/login");
        }
        const regFunc=()=>{
            nav("/register");
        }
        const homeFunc=()=>{
            //localStorage.removeItem("token");
            nav("/");
        }
        return(
        <>
        <Heading/>
        <div>
            <ul className="nav">
                <img src="/images/user.png" alt="pic1"/>
                <li onClick={regFunc}>REGISTER</li>
                <li onClick={logFunc}>LOGIN</li>
                <li onClick={homeFunc}>HOME</li>
            </ul>
        </div>
        </>
        )
}
export default User;

