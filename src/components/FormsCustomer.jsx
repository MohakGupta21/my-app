import React, { useState } from "react";
import axios from "axios";
import Heading from "./Heading";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
// import Get from "./Get";

function FormsCustomer() {
  const location = useLocation();

  const { c_id, name, age, address, city, mobile_no, pin } =
    location.state || {};

  const [id, setId] = useState(c_id);
  const [c_name, setName] = useState(name);
  const [c_age, setAge] = useState(age);
  const [c_address, setAddress] = useState(address);
  const [c_city, setCity] = useState(city);
  const [c_pin, setPin] = useState(pin);
  const [c_phone, setPhone] = useState(mobile_no);
  const [c_output, setOutput] = useState("");
  // const {disabled} = (location.state!==null?true:false);
  // console.log("disabled"+disabled);

  const navigate = useNavigate();
  const successRes = (data) => {
    var info = document.getElementById("cust_info");
    info.classList.remove("hide");
    info.classList.add("bg-success");
    var x = document.getElementsByTagName("BODY")[0];

    x.classList.add("brown");
    setOutput(data);

    setTimeout(() => {
      x.classList.remove("brown");

      info.classList.remove("bg-success");
      info.classList.add("hide");
      navigate('/');
    }, 2000);


    // navigate('/');
  };
  const failRes = (data) => {
    var info = document.getElementById("cust_info");
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
    if (c_age < 5) {
      failRes("Age cannot be less than 5");
    } 
    else if (!c_phone.match(/^[6789]\d{9}$/g) || c_phone === "") {
      failRes("Phone number must be valid");
    } 
    else {
      // successRes("Hey!");
      //Here we perform update operation
      axios
        .put(`http://localhost:8080/customer/${c_id}`, {
            id: id,
            name: c_name,
            age: c_age,
            address: c_address,
            city: c_city,
            pin: c_pin,
            phone: c_phone,
        })
        .then((response) => {
            if (response.status === 201) successRes(response.data);
            else failRes(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    if (c_age < 5) {
      failRes("Age cannot be less than 5");
    } else if (!c_phone.match(/^[6789]\d{9}$/g) || c_phone === "") {
      failRes("Phone number must be valid");
    } else {
      axios({
        method: "POST",
        url: "http://localhost:8080/customer",
        data: {
          id: id,
          name: c_name,
          age: c_age,
          address: c_address,
          city: c_city,
          pin: c_pin,
          phone: c_phone,
        },
      })
        .then((response) => {
          if (response.status === 201) successRes(response.data);
          else failRes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    e.preventDefault();
  };
  const handleIdOnChange = (e) => {
    setId(e.target.value);
  };
  const handleNameOnChange = (e) => {
    setName(e.target.value);
  };
  const handleAgeOnChange = (e) => {
    setAge(e.target.value);
  };
  const handleAddressOnChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePinOnChange = (e) => {
    setPin(e.target.value);
  };
  const handleCityOnChange = (e) => {
    setCity(e.target.value);
  };
  const handlePhoneOnChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <>
      <NavigationBar />
      <div className="box">
        <Heading text="Customer" />
        <p className="comment hide" id="cust_info">
          {c_output}
        </p>
        <form>
          <div class="form-group p-2">
            <label for="c_id">Customer ID</label>
            {location.state === null && (
              <input
                type="number"
                class="form-control"
                onChange={handleIdOnChange}
                value={id}
                id="c_id"
                name="id"
                placeholder="Enter ID"
              />
            )}
            {location.state !== null && (
              <input
                type="number"
                class="form-control"
                onChange={handleIdOnChange}
                value={id}
                id="c_id"
                name="id"
                placeholder="Enter ID"
                disabled
              />
            )}
          </div>
          <div class="form-group p-2">
            <label for="customer_name">Name</label>
            <input
              type="text"
              class="form-control"
              onChange={handleNameOnChange}
              value={c_name}
              id="customer_name"
              name="name"
              placeholder="Enter Name"
            />
          </div>
          <div class="form-group p-2">
            <label for="customer_age">Age</label>
            <input
              type="number"
              class="form-control"
              onChange={handleAgeOnChange}
              value={c_age}
              id="customer_age"
              name="age"
              placeholder="Enter Age"
            />
          </div>
          <div class="form-group p-2">
            <label for="customer_address">Address</label>
            <input
              type="text"
              class="form-control"
              onChange={handleAddressOnChange}
              value={c_address}
              id="customer_address"
              name="address"
              placeholder="Enter Address"
            />
          </div>
          <div class="form-group p-2">
            <label for="customer_city">City</label>
            <input
              type="text"
              class="form-control"
              onChange={handleCityOnChange}
              value={c_city}
              id="customer_city"
              name="city"
              placeholder="Enter City"
            />
          </div>
          <div class="form-group p-2">
            <label for="PIN">PIN</label>
            <input
              type="number"
              class="form-control"
              onChange={handlePinOnChange}
              value={c_pin}
              id="PIN"
              name="pin"
              placeholder="Enter PIN"
            />
          </div>
          <div class="form-group p-2">
            <label for="mobile_no">Phone Number</label>
            <input
              type="text"
              pattern="[789][0-9]{9}"
              class="form-control"
              onChange={handlePhoneOnChange}
              value={c_phone}
              id="mobile_no"
              name="mobile_no"
              placeholder="Enter Mobile Number"
            />
          </div>
          {location.state === null && (
            <button
              type="submit"
              class="btn btn-primary mt-2"
              onClick={handleSubmit}
            >
              Add Customer
            </button>
          )}
          {location.state !== null && (
            <button
              type="submit"
              class="btn btn-primary mt-2"
              onClick={updateEntry}
            >
              Update Customer
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default FormsCustomer;
