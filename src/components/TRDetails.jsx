import React from "react";
import Heading from "./Heading";
import axios from "axios";
import { useState } from "react";
import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";

function TRDetails(){
    const location = useLocation();
    const navigate = useNavigate();

    const { sq_id,test_res_id,test_name,test_dval,test_aval,observation } = location.state || {};


    const [sqId,setSqId] = useState(sq_id);
    const [trId,setTrId] = useState(test_res_id);
    const [testName,setTestName] = useState(test_name);
    const [dval,setDval] = useState(test_dval);
    const [aval,setAval] = useState(test_aval);
    const [observe,setObserve] = useState(observation);

    const [output,setOutput] = useState(null);


    const successRes = (data) =>{
        var info = document.getElementById('trdetails_info');
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
        var info = document.getElementById('trdetails_info');
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
          .put(`http://localhost:8080/trdetails/${sqId}`, {
            sq_id:sqId,tr_id:trId,name:testName,dval:dval,aval:aval,observe:observe
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
                url: 'http://localhost:8080/trdetails',
                data: { sq_id:sqId,tr_id:trId,name:testName,dval:dval,aval:aval,observe:observe }
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
    const handleSqIdOnChange =(e)=>{
        setSqId(e.target.value);
    }
    const handleTrIdOnChange =(e)=>{
        setTrId(e.target.value);
    }    
    const handleTestNameOnChange =(e)=>{
        setTestName(e.target.value);
    }    
    const handleDvalOnChange =(e)=>{
        setDval(e.target.value);
    }    
    const handleAvalOnChange =(e)=>{
        setAval(e.target.value);
    }
    const handleObserveOnChange =(e)=>{
        setObserve(e.target.value);
    }

    return (
        <>
        <NavigationBar/>
        <div className="box">
            <Heading text="Test Result Details"/>
            <p className="comment hide" id="trdetails_info">{output}</p>

            <form>
                <div class="form-group p-2">
                    <label for="sq_id">SQ ID</label>
                    {
                        location.state===null &&
                        <input type="number" class="form-control" id="sq_id" name="sq_id" value={sqId} onChange={handleSqIdOnChange} placeholder="Enter ID"/>
                    }
                    {
                        location.state!==null &&
                        <input type="number" class="form-control" id="sq_id" name="sq_id" value={sqId} onChange={handleSqIdOnChange} placeholder="Enter ID" disabled/>
                    }
                </div>
                <div class="form-group p-2">
                    <label for="tr_id">Test Result ID</label>
                    <input type="text" class="form-control" id="tr_id" name="tr_id" value={trId} onChange={handleTrIdOnChange} placeholder="Enter Test Result ID"/>
                </div>
                <div class="form-group p-2">
                    <label for="test_name">Test Name</label>
                    <input type="text" class="form-control" id="test_name" name="test_name" value={testName} onChange={handleTestNameOnChange} placeholder="Enter Test Name"/>
                </div>
                <div class="form-group p-2">
                    <label for="dval">Test D Value</label>
                    <input type="number" class="form-control" id="dval" name="dval" value={dval} onChange={handleDvalOnChange} placeholder="Enter D Value"/>
                </div>
                <div class="form-group p-2">
                    <label for="aval">Test A Value</label>
                    <input type="number" class="form-control" id="aval" name="aval" value={aval} onChange={handleAvalOnChange} placeholder="Enter A Value"/>
                </div>
                <div class="form-group p-2">
                    <label for="observe">Observation</label>
                    <input type="text" class="form-control" id="observe" name="observe" value={observe} onChange={handleObserveOnChange} placeholder="Enter Observation"/>
                </div>
                {
                    location.state===null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={handleSubmit}>Add Test Result Details</button>
                }
                {
                    location.state!==null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={updateEntry}>Update Test Result Details</button>
                }
            </form>
        </div>
        </>
    );
}

export default TRDetails;