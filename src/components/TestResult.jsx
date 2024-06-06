import React from "react";
import axios from "axios";
import { useState } from "react";
import Heading from "./Heading";
import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";

function TestResult(){
    const location = useLocation();
    const navigate = useNavigate();

    const { test_res_id,ser_id,instance_id } = location.state || {};

    const [serviceId,setServiceId] = useState(ser_id);
    const [testResultId,setTestResultId] = useState(test_res_id);
    const [instanceId,setInstanceIdId] = useState(instance_id);
    const [output,setOutput] = useState(null);

    const successRes = (data) =>{
        var info = document.getElementById('testresult_info');
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
        var info = document.getElementById('testresult_info');
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
          .put(`http://localhost:8080/test_result/${testResultId}`, {
          s_id:serviceId,tr_id:testResultId,instance_id: instanceId
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
                url: 'http://localhost:8080/testresult',
                data: { s_id:serviceId,tr_id:testResultId,instance_id: instanceId}
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
    const handleServiceIdOnChange =(e)=>{
        setServiceId(e.target.value);
    }
    const handleTestResultIdOnChange =(e)=>{
        setTestResultId(e.target.value);
    }    
    const handleInstanceIdOnChange =(e)=>{
        setInstanceIdId(e.target.value);
    }    
    return (
        <>
        <NavigationBar/>
        <div className="box">
            <Heading text="Test Result"/>
            <p className="comment hide" id="testresult_info">{output}</p>

            <form>
                <div class="form-group p-2">
                    <label for="tr_id">Test Result ID</label>
                    {
                        location.state===null &&
                        <input type="number" class="form-control" id="tr_id" name="tr_id" value={testResultId} onChange={handleTestResultIdOnChange} placeholder="Enter Test Result ID"/>
                    }
                    {
                        location.state!==null &&
                        <input type="number" class="form-control" id="tr_id" name="tr_id" value={testResultId} onChange={handleTestResultIdOnChange} placeholder="Enter Test Result ID" disabled/>
                    }
                </div>
                <div class="form-group p-2">
                    <label for="ser_id">Service ID</label>
                    <input type="number" class="form-control" id="ser_id" name="ser_id" value={serviceId} onChange={handleServiceIdOnChange} placeholder="Enter Service ID"/>
                </div>
                <div class="form-group p-2">
                    <label for="instance_id">Instance ID</label>
                    <input type="number" class="form-control" id="instance_id" name="instance_id" value={instanceId} onChange={handleInstanceIdOnChange} placeholder="Enter Instance ID"/>
                </div>
                {
                    location.state===null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={handleSubmit}>Add Service</button>
                }
                {
                    location.state!==null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={updateEntry}>Update Service</button>
                }
            </form>
        </div>
        </>
    );
}

export default TestResult;