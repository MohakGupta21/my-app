import React, { useState } from "react";
import axios from "axios";
import Heading from "./Heading";
import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";

function Lab(){

    const location = useLocation();
    const navigate = useNavigate();

    const { lab_id,name,address } = location.state || {};

    const [id,setId] = useState(lab_id);
    const [lname,setName] = useState(name);
    const [laddress,setAddress] = useState(address);
    const [output,setOutput] = useState(null);

    const successRes = (data) =>{
        var info = document.getElementById('lab_info');
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
        var info = document.getElementById('lab_info');
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
          .put(`http://localhost:8080/lab/${lab_id}`, {
            id:id,name:lname,address:laddress 
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
                url: 'http://localhost:8080/lab',
                data: { id:id,name:name,address:address }
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
    const handleAddressOnChange =(e)=>{
        setAddress(e.target.value);
    }    
    return (
        <>
        <NavigationBar/>
        <div className="box">
            <Heading text="Lab"/>
            <p className="comment hide" id="lab_info">{output}</p>

            <form>
                <div class="form-group p-2">
                    <label for="lab_id">Lab ID</label>
                    {
                        location.state===null &&
                        <input type="number" class="form-control" id="lab_id" name="lab_id" value={id} onChange={handleIdOnChange} placeholder="Enter ID"/>
                    }
                    {
                        location.state!==null &&
                        <input type="number" class="form-control" id="lab_id" name="lab_id" value={id} onChange={handleIdOnChange} placeholder="Enter ID" disabled/>   
                    }
                </div>
                <div class="form-group p-2">
                    <label for="lab_name">Name</label>
                    <input type="text" class="form-control" id="lab_name" name="name" value={lname} onChange={handleNameOnChange} placeholder="Enter Name"/>
                </div>
                <div class="form-group p-2">
                    <label for="lab_address">Address</label>
                    <input type="text" class="form-control" id="lab_address" name="address" value={laddress} onChange={handleAddressOnChange} placeholder="Enter Lab Address"/>
                </div>
                
                {
                    location.state===null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={handleSubmit}>Add Lab</button>
                }
                {
                    location.state!==null &&
                    <button type="submit" class="btn btn-primary mt-2" onClick={updateEntry}>Update Lab</button>
                }
            </form>
        </div>
        </>
    );
}

export default Lab;