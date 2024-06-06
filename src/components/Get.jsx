import React, { useState } from "react";
import "./styling/table.css";
import { ReactComponent as Del } from "./logo/archive-fill.svg";
import { ReactComponent as Edit } from "./logo/pencil-fill.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Get(props) {
  // console.log(props.result);
  const homes = props.result;
  const [id, setId] = useState(null);
  const [api, setApi] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [output, setOutput] = useState(null);
  const navigate = useNavigate();

  const allKeys = Array.from(
    new Set(homes.flatMap((item) => Object.keys(item)))
  );
  const successRes = (data) =>{
    var info = document.getElementById('delete_info');
    info.classList.remove('hide');
    info.classList.add('bg-success');
    var x = document.getElementsByTagName("BODY")[0];
    
    x.classList.add("brown");
    setOutput(data);


    setTimeout(()=>{
        x.classList.remove("brown");

        info.classList.remove('bg-success');
        info.classList.add('hide');

    },2000);

    // navigate('/');
}
const failRes = (data) =>{
    var info = document.getElementById('delete_info');
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
  const deleteConfirm = () => {
    axios
      .delete(`http://localhost:8080/${api}/${id}`)
      .then((response) => {
        if(response.status===201)
          successRes(response.data);
      else
          failRes(response.data);
      })
      .catch((error) => {
        console.error(error);
        failRes(error);
      });
  };
  // const navigate = useNavigate();
  const deleteKey = (item) => {
    const values = Object.values(item);
    // console.log(values[0]);
    setApi("delete" + props.table);

    setId(values[0]);
    setDialog(true);
    document.getElementsByTagName("BODY")[0].classList.add("brown");
  };

  const editKey = (item) => {
    const edit = Object.values(item);
    console.log(item);
    // alert(edit);
    // setId(edit[0]);
    navigate(`/${props.table}/${edit[0]}`,{state:item});
  };

  return (
    <>
      <p className="comment hide" id="delete_info">{output}</p>
      <table>
        <thead>
          <tr>
            {allKeys.map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {homes.map((item, index) => (
            <tr key={index}>
              {allKeys.map((key) => (
                <td key={key}>{item[key] !== undefined ? item[key] : "-"}</td>
              ))}
              <td>
                <button onClick={() => deleteKey(item)}>
                  <Del />
                </button>
              </td>
              <td>
                <button onClick={() => editKey(item)}>
                  <Edit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {dialog === true && (
        <div className="confirm-box">
          <p>Are you sure you want to delete this item</p>
          <button
            className="color red-btn"
            onClick={() => {
              deleteConfirm();
              setDialog(false);
              document.getElementsByTagName("BODY")[0].classList.remove("brown");
            }}
          >
            Yes
          </button>
          <button
            className="color green-btn"
            onClick={() => {
              setDialog(false);
              document.getElementsByTagName("BODY")[0].classList.remove("brown");

            }}
          >
            No
          </button>
        </div>
      )}
    </>
  );
}
export default Get;
