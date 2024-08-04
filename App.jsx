import {BrowserRouter,Route,Routes} from "react-router-dom";
import { Home} from "./pages/Home";
import Register from "./pages/Register";
import Login  from "./pages/Login";
import User from "./pages/User";
import { Basic } from "./pages/Basic";
import { Qualificationdetails } from "./pages/Qualification";
import { About} from "./pages/About";
import { Contact } from "./pages/Contact";
import { Personal } from "./pages/Personal";
import { Admin } from "./pages/Adminlogin";
import { Adminbasic } from "./pages/Adminbasic";
import { Emp_details} from "./pages/admin_emp_details";
import { Emp_qualification } from "./pages/admin_emp_qualification";
import { Contact_details } from "./pages/Admin_conatct_details";
import { Edit_emp_details } from "./pages/Edit_emp_details";
import { Edit_emp_quali } from "./pages/Edit_emp_quali";
import { Forgot_password } from "./pages/Forgot";
import { Admin_forgot_password } from "./pages/Admin-forgotPassword";
import { Stat } from "./pages/Statistics";
const App=()=>{
    const token=localStorage.getItem("token");
    if(token){
    return(
      <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin/login" element={<Admin/>}/>
        <Route path="/admin/basic" element={<Adminbasic/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/qualificationdetails" element={<Qualificationdetails/>}/>
        <Route path="/basic" element={<Basic/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/personal_details" element={<Personal/>}/>
        <Route path="/admin/emp_details" element={<Emp_details/>}/>
        <Route path="/admin/emp_qualifications" element={<Emp_qualification/>}/>
        <Route path="/admin/contact-details" element={<Contact_details/>}/>
        <Route path="/admin/edit/qualifiaction/:id" element={<Edit_emp_quali/>}/>
        <Route path="/admin/edit/details/:id" element={<Edit_emp_details/>}/>
        <Route path="/forgot_password" element={<Forgot_password/>}/>
        <Route path="/admin/forgot_password" element={<Admin_forgot_password/>}/>      
        <Route path="/admin/stat-details" element={<Stat/>}/>
      </Routes>
      </BrowserRouter>
      </>)
    }
    else{
      return(
        <>
        <BrowserRouter>
        <Routes>
          <Route path="/basic" element={<Basic/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/qualificationdetails" element={<Qualificationdetails/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/admin/login" element={<Admin/>}/>
          <Route path="forgot_password" element={<Forgot_password/>}/>        
          <Route path="/admin/forgot_password" element={<Admin_forgot_password/>}/>
        </Routes>
        </BrowserRouter>
        </>)    
    }
};
export default App;