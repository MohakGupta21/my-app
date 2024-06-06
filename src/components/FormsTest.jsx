import React from "react";
import axios from "axios";
import { useState } from "react";
import Heading from "./Heading";
import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";

function FormsTest(){
    const location = useLocation();

    const { test_id,test_name,test_dvalue,test_desc,test_range } =
    location.state || {};

    const [id,setId] = useState(test_id);
    const [name,setName] = useState(test_name);
    const [dval,setDval] = useState(test_dvalue);
    const [desc,setDesc] = useState(test_desc);
    const [range,setRange] = useState(test_range);

    const navigate = useNavigate();
    const [output,setOutput] = useState("");


    const successRes = (data) =>{
        var info = document.getElementById('test_info');
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
        var info = document.getElementById('test_info');
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
          .put(`http://localhost:8080/tests/${test_id}`, {
            id:id,name:name,dval:dval,desc:desc,range:range
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
                url: 'http://localhost:8080/test',
                data: { id:id,name:name,dval:dval,desc:desc,range:range}
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
    const handleIdOnChange =(e)=>{
        setId(e.target.value);
    }
    const handleNameOnChange =(e)=>{
        setName(e.target.value);
    }    
    const handleDValOnChange =(e)=>{
        setDval(e.target.value);
    }    
    const handleDescOnChange =(e)=>{
        setDesc(e.target.value);
    }    
    const handleRangeOnChange =(e)=>{
        setRange(e.target.value);
    }

    return (
        <>
        <NavigationBar/>
        <div className="box">
            <Heading text="Test"/>
            <p className="comment hide" id="test_info">{output}</p>
            <form>
                <div class="form-group p-2">
                    <label for="test_id">Test ID</label>
                    {
                        location.state===null &&
                        <input type="number" class="form-control" id="test_id" name="test_id" value={id} onChange={handleIdOnChange} placeholder="Enter ID"/>
                    }
                    {
                        location.state!==null &&
                        <input type="number" class="form-control" id="test_id" name="test_id" value={id} onChange={handleIdOnChange} placeholder="Enter ID" disabled/>
                    }
                </div>
                <div class="form-group p-2">
                    <label for="test_name">Name</label>
                    <input type="text" class="form-control" id="test_name" name="name" value={name} onChange={handleNameOnChange} placeholder="Enter Name"/>
                </div>
                <div class="form-group p-2">
                    <label for="d_value">D Value</label>
                    <input type="number" class="form-control" id="d_value" name="d_value" value={dval} onChange={handleDValOnChange} placeholder="Enter D Value"/>
                </div>
                <div class="form-group p-2">
                    <label for="test_desc">Description</label>
                    <input type="test" class="form-control" id="test_desc" name="test_desc" value={desc} onChange={handleDescOnChange} placeholder="Description"/>
                </div>
                <div class="form-group p-2">
                    <label for="range">Range</label>
                    <input type="number" class="form-control" id="range" name="range" value={range} onChange={handleRangeOnChange} placeholder="Enter Range"/>
                </div>
                {
                    location.state===null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={handleSubmit}>Add Test</button>
                }
                {
                    location.state!==null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={updateEntry}>Update Test</button>
                }
            </form>
        </div>
        </>
    );
}

export default FormsTest;