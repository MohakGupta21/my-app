import React from "react";
import { Outlet } from "react-router-dom";
function NavigationBar(){
    return(
        <>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/customer">Customer</a>
            </li>
            <li>
              <a href="/service">Service</a>
            </li>
            <li>
              <a href="/test">Test</a>
            </li>
            <li>
              <a href="/servicetest">Service Test</a>
            </li>
            <li>
              <a href="/lab">Lab</a>
            </li>
            <li>
              <a href="/test_result">Test Result</a>
            </li>
            <li>
              <a href="/test_schedule">Test Schedule</a>
            </li>
            <li>
              <a href="/test_result_details">Test Result Details</a>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    )
}

export default NavigationBar;