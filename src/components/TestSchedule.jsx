import React from "react";
import Heading from "./Heading";
import axios from "axios";
import { useState } from "react";
import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";

function TestSchedule(){
    const location = useLocation();
    const navigate = useNavigate();

    const { instance_id,lab_id,c_id,sch_datetime,collection_datetime,empl_details,status } = location.state || {};


    const formatDate = (date) => {
        const d = new Date(date);
        console.log(d.getMonth());
        console.log(d.getDate());
    
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };
    
    const [instanceId,setInstanceId] = useState(instance_id);
    const [labId,setLabId] = useState(lab_id);
    const [custId,setCustId] = useState(c_id);
    const [schDate,setSchDate] = useState(formatDate(sch_datetime));
    const [colDate,setColDate] = useState(formatDate(collection_datetime));

    const [custDetails,setCustDetails] = useState(empl_details);
    const [_status,setStatus] = useState(status);
    const [output,setOutput] = useState("");


    const successRes = (data) =>{
        var info = document.getElementById('testsch_info');
        info.classList.remove('hide');
        info.classList.add('bg-success');
        var x = document.getElementsByTagName("BODY")[0];
        
        x.classList.add("brown");
        setOutput(data);


        setTimeout(()=>{
            x.classList.remove("brown");

            info.classList.remove('bg-success');
            info.classList.add('hide');
            navigate('/');
        },2000);
    }
    const failRes = (data) =>{
        var info = document.getElementById('testsch_info');
        info.classList.remove('hide');
        info.classList.add('bg-danger');
        var x = document.getElementsByTagName("BODY")[0];

        x.classList.add("brown");
        setOutput(data);


        setTimeout(()=>{
            x.classList.remove("brown");
            info.classList.remove('bg-danger');
            info.classList.add('hide');
        },2000);
    }
    const updateEntry = (e) => {
        // successRes("Hey!");
        //Here we perform update operation
        axios
          .put(`http://localhost:8080/testschedule/${instanceId}`, {
            instance_id:instanceId,lab_id:labId,cust_id:custId,sch_date:schDate,col_date:colDate,cust_details:custDetails,status:_status
        })
          .then((response) => {
            if (response.status === 201) successRes(response.data);
            else failRes(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        e.preventDefault();
      };

    const handleSubmit =(e)=>{

            axios({
                method: 'POST',
                url: 'http://localhost:8080/testschedule',
                data: { instance_id:instanceId,lab_id:labId,cust_id:custId,sch_date:schDate,col_date:colDate,cust_details:custDetails,status:_status }
            })
            .then((response) => {
                if(response.status===201)
                    successRes(response.data);
                else
                    failRes(response.data);

            })
            .catch(error => {
                console.log(error)
            })
        
        e.preventDefault();
          
    }
    const handleInstanceIdOnChange =(e)=>{
        setInstanceId(e.target.value);
    }
    const handleLabIdOnChange =(e)=>{
        setLabId(e.target.value);
    }    
    const handleCustIdOnChange =(e)=>{
        setCustId(e.target.value);
    }    
    const handleSchDateOnChange =(e)=>{
        setSchDate(e.target.value);
    }    
    const handleColDateOnChange =(e)=>{
        setColDate(e.target.value);
    }
    const handleCustDetailsOnChange =(e)=>{
        setCustDetails(e.target.value);
    }
    const handleStatusOnChange =(e)=>{
        setStatus(e.target.value);
    }
    return (
        <>
        <NavigationBar/>
        <div className="box">
            <Heading text="Test Schedule"/>
            <p className="comment hide" id="testsch_info">{output}</p>

            <form>
                <div class="form-group p-2">
                    <label for="instance_id">Instance ID</label>
                    {
                        location.state===null &&
                        <input type="number" class="form-control" id="instance_id" name="instance_id" value={instanceId} onChange={handleInstanceIdOnChange} placeholder="Enter Inatance ID"/>
                    }
                    {
                        location.state!==null &&
                        <input type="number" class="form-control" id="instance_id" name="instance_id" value={instanceId} onChange={handleInstanceIdOnChange} placeholder="Enter Inatance ID" disabled/>
                    }
                </div>
                <div class="form-group p-2">
                    <label for="lab_id">Lab ID</label>
                    <input type="number" class="form-control" id="lab_id" name="lab_id" value={labId} onChange={handleLabIdOnChange} placeholder="Enter Lab ID"/>
                </div>
                <div class="form-group p-2">
                    <label for="customer_id">Customer ID</label>
                    <input type="number" class="form-control" id="customer_id" name="customer_id" value={custId} onChange={handleCustIdOnChange} placeholder="Enter Customer Id"/>
                </div>
                <div class="form-group p-2">
                    <label for="sch_datetime">Schedule Date Time</label>
                    <input type="date" class="form-control" id="sch_datetime" name="sch_datetime" value={schDate} onChange={handleSchDateOnChange} placeholder="Enter Schedule Date/Time"/>
                </div>
                <div class="form-group p-2">
                    <label for="col_datetime">Collection Date Time</label>
                    <input type="date" class="form-control" id="col_datetime" name="col_datetime" value={colDate} onChange={handleColDateOnChange} placeholder="Enter Collection Date/Time"/>
                </div>
                <div class="form-group p-2">
                    <label for="emp_details">Customer Details</label>
                    <input type="text" class="form-control" id="emp_details" name="emp_details" value={custDetails} onChange={handleCustDetailsOnChange} placeholder="Enter Customer Details"/>
                </div>
                <div class="form-group p-2">
                    <label for="status">Status</label>
                    <input type="text" class="form-control" id="status" name="status" value={_status} onChange={handleStatusOnChange} placeholder="Enter Status"/>
                </div>
                {
                    location.state === null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={handleSubmit}>Add Test Schedule</button>
                }
                {
                    location.state !== null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={updateEntry}>Update Test Schedule</button>
                }
            </form>
        </div>
        </>
    );
}

export default TestSchedule;