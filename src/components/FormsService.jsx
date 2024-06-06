import React, { useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
function FormsService() {
  const location = useLocation();

  const formatDate = (date) => {
    const d = new Date(date);
    console.log(d.getMonth());
    console.log(d.getDate());

    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const { ser_id, ser_name, ser_desc, ser_charge, ser_date } =
    location.state || {};

  const [id, setId] = useState(ser_id);
  const [name, setName] = useState(ser_name);
  const [desc, setDesc] = useState(ser_desc);
  const [charge, setCharge] = useState(ser_charge);
  const [date, setDate] = useState(formatDate(ser_date));
  const [output, setOutput] = useState(null);
  const navigate = useNavigate();

  const successRes = (data) => {
    var info = document.getElementById("serv_info");
    info.classList.remove("hide");
    info.classList.add("bg-success");
    var x = document.getElementsByTagName("BODY")[0];

    x.classList.add("brown");
    setOutput(data);

    setTimeout(() => {
      x.classList.remove("brown");

      info.classList.remove("bg-success");
      info.classList.add("hide");
      navigate("/");
    }, 2000);
  };
  const failRes = (data) => {
    var info = document.getElementById("serv_info");
    info.classList.remove("hide");
    info.classList.add("bg-danger");
    var x = document.getElementsByTagName("BODY")[0];

    x.classList.add("brown");
    setOutput(data);

    setTimeout(() => {
      x.classList.remove("brown");
      info.classList.remove("bg-danger");
      info.classList.add("hide");
    }, 2000);
  };



  const updateEntry = (e) => {
    // successRes("Hey!");
    //Here we perform update operation
    axios
      .put(`http://localhost:8080/service/${ser_id}`, {
        id: id,
        name: name,
        desc: desc,
        charge: charge,
        date: date,
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

  const handleSubmit = (e) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/service",
      data: { id: id, name: name, desc: desc, charge: charge, date: date },
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
  const handleIdOnChange = (e) => {
    setId(e.target.value);
  };
  const handleNameOnChange = (e) => {
    setName(e.target.value);
  };
  const handleDescOnChange = (e) => {
    setDesc(e.target.value);
  };
  const handleChargeOnChange = (e) => {
    setCharge(e.target.value);
  };
  const handleDateOnChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <>
      <NavigationBar />
      <div className="box">
        <Heading text="Service" />
        <p className="comment hide" id="serv_info">
          {output}
        </p>
        <form action="#">
          <div class="form-group p-2">
            <label for="service_id">Service ID</label>
            {location.state === null && (
              <input
                type="number"
                class="form-control"
                onChange={handleIdOnChange}
                value={id}
                id="service_id"
                name="ser_id"
                placeholder="Enter Service ID"
              />
            )}
            {location.state !== null && (
              <input
                type="number"
                class="form-control"
                onChange={handleIdOnChange}
                value={id}
                id="service_id"
                name="ser_id"
                placeholder="Enter Service ID"
                disabled
              />
            )}
          </div>
          <div class="form-group p-2">
            <label for="service_name">Name</label>
            <input
              type="text"
              class="form-control"
              id="service_name"
              value={name}
              onChange={handleNameOnChange}
              name="name"
              placeholder="Enter Name"
            />
          </div>
          <div class="form-group p-2">
            <label for="service_desc">Description</label>
            <input
              type="text"
              class="form-control"
              id="service_desc"
              value={desc}
              onChange={handleDescOnChange}
              name="desc"
              placeholder="Enter Description"
            />
          </div>
          <div class="form-group p-2">
            <label for="service_charge">Charge</label>
            <input
              type="number"
              class="form-control"
              id="service_charge"
              value={charge}
              onChange={handleChargeOnChange}
              name="charge"
              placeholder="Enter Charge"
            />
          </div>
          <div class="form-group p-2">
            <label for="date">Date</label>
            <input
              type="date"
              class="form-control"
              id="service_date"
              value={date}
              onChange={handleDateOnChange}
              name="date"
              placeholder="Enter Date"
            />
          </div>

          {location.state === null && (
            <button
              type="submit"
              class="btn btn-primary mt-2"
              onClick={handleSubmit}
            >
              Add Service
            </button>
          )}
          {location.state !== null && (
            <button
              type="submit"
              class="btn btn-primary mt-2"
              onClick={updateEntry}
            >
              Update Service
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default FormsService;
