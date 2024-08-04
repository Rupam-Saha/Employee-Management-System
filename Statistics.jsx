import Chart from "react-apexcharts";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./statistics.css";
export const Stat=()=>{
    const [x1,setx]=useState([]);
    const [y1,sety]=useState([]);
    var i=0;
    const navi=useNavigate();
    const func=async ()=>{
        try{
            const x=[];
            const y=[];
            const respo=await fetch("http://localhost:4000/admin/getstat",{
                method:"GET"
            });
            const res=await respo.json();
            //console.log(res);
            //console.log(res.length);
            for(i=0;i<res.length;i++){
                y.push(res[i].year);
                x.push(res[i].number_of_employees);
            }
            //console.log(x);
            setx(x);
            sety(y);
            //console.log(x1);
            window.dispatchEvent(new Event('resize'));
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func()
    },[10]);
    const func1=()=>{
        navi("/admin/basic");
    }
    return(
        <>
        <div className="div">
        <h1><center>RS GROUP OF COMPANIES</center></h1>
            <Chart
            type="pie"
            width={1080}
            height={300}
            series={x1}
            options={{
                labels:y1
            }}
            >
            </Chart>
            <button id="x" onClick={func1}>BACK</button>    
        </div>
        </>
    )
}