import React, { useState } from "react";
import axios from "axios";
import Heading from "./Heading";
import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";

function FormsServiceTest(){

    const location = useLocation();

    const { service_test_id,ser_id,test_id } =
    location.state || {};
    const navigate = useNavigate();

    const [serviceId,setServiceId] = useState(ser_id);
    const [testId,setTestId] = useState(test_id);
    const [serviceTestId,setServiceTestId] = useState(service_test_id);
    const [output,setOutput] = useState(null);

    const successRes = (data) =>{
        var info = document.getElementById('servtest_info');
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
        var info = document.getElementById('servtest_info');
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
          .put(`http://localhost:8080/servicetest/${serviceTestId}`, {
            s_id:serviceId,t_id:testId,st_id:serviceTestId 
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
                url: 'http://localhost:8080/servicetest',
                data: { s_id:serviceId,t_id:testId,st_id:serviceTestId }
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
    const handleTestIdOnChange =(e)=>{
        setTestId(e.target.value);
    }    
    const handleServiceTestIdOnChange =(e)=>{
        setServiceTestId(e.target.value);
    }    

    return (
        <>
        <NavigationBar/>
        <div className="box">

            <Heading text="Service Test"/>
            <p className="comment hide" id="servtest_info">{output}</p>

            <form>
                <div class="form-group p-2">
                    <label for="service_id">Service ID</label>
                    <input type="number" class="form-control" id="service_id" name="service_id" value={serviceId} onChange={handleServiceIdOnChange} placeholder="Enter Service ID"/>
                </div>
                <div class="form-group p-2">
                    <label for="test_id">Test ID</label>
                    <input type="number" class="form-control" id="test_id" name="testid" value={testId} onChange={handleTestIdOnChange} placeholder="Enter Test ID"/>
                </div>
                <div class="form-group p-2">
                    <label for="st_id">Service Test ID</label>
                    {
                        location.state===null &&
                        <input type="number" class="form-control" id="st_id" name="st_id" value={serviceTestId} onChange={handleServiceTestIdOnChange} placeholder="Enter Service Test ID"/>
                    }
                    {
                        location.state!==null &&
                        <input type="number" class="form-control" id="st_id" name="st_id" value={serviceTestId} onChange={handleServiceTestIdOnChange} placeholder="Enter Service Test ID" disabled/>
                    }
                    
                </div>
                {
                    location.state===null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={handleSubmit}>Add Service Test Relation</button>
                }
                {
                    location.state!==null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={updateEntry}>Update Service Test Relation</button>
                }
            </form>
        </div>
        </>
    );
}

export default FormsServiceTest;