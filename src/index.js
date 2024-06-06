import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import FormsCustomer from "./components/FormsCustomer";
import FormsService from "./components/FormsService";
import FormsServiceTest from "./components/FormsServiceTest";
import FormsTest from "./components/FormsTest";
import Lab from "./components/Lab";
import NotFound from "./components/NotFound";
import TRDetails from "./components/TRDetails";
import TestResult from "./components/TestResult";
import TestSchedule from "./components/TestSchedule";
import { Routes,Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/customer/:id" element={<FormsCustomer/>}/>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/customer" element={<FormsCustomer/>} />
      <Route exact path="/service" element={<FormsService />} />
      <Route exact path="/service/:id" element={<FormsService />} />

      <Route exact path="/test" element={<FormsTest />} />
      <Route exact path="/test_master/:id" element={<FormsTest />} />

      <Route exact path="/servicetest" element={<FormsServiceTest />} />
      <Route exact path="/service_test_details/:id" element={<FormsServiceTest />} />

      <Route exact path="/lab" element={<Lab />} />
      <Route exact path="/lab/:id" element={<Lab />} />

      <Route exact path="/test_result" element={<TestResult />} />
      <Route exact path="/test_result/:id" element={<TestResult />} />

      <Route exact path="/test_schedule" element={<TestSchedule />} />
      <Route exact path="/test_schedule/:id" element={<TestSchedule />} />

      <Route exact path="/test_result_details" element={<TRDetails />} />
      <Route exact path="/tr_details/:id" element={<TRDetails />} />


      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
