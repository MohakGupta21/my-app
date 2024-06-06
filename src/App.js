import { useState } from "react";
import "./App.css";
import axios from "axios";
import Get from "./components/Get";
import NavigationBar from "./components/NavigationBar";
import { useNavigate } from "react-router-dom";

function App() {
  const [displayCust, setDisplayCust] = useState(false);
  const [displayService, setDisplayService] = useState(false);
  const [displaySTests, setDisplaySTests] = useState(false);
  const [displayTests, setDisplayTests] = useState(false);
  const [displayLabs, setDisplayLabs] = useState(false);
  const [displayTestResults, setDisplayTestResults] = useState(false);
  const [displayTestSchedules, setDisplayTestSchedules] = useState(false);
  const [displayTRDetails, setDisplayTRDetails] = useState(false);

  const [cres, setCres] = useState(null);
  const [sres, setSres] = useState(null);
  const [stres, setStres] = useState(null);
  const [tres, setTres] = useState(null);
  const [lres, setLres] = useState(null);
  const [trres, setTrres] = useState(null);
  const [tsres, setTsres] = useState(null);
  const [trdres, setTRdres] = useState(null);

  const handleClick1 = (e) => {
    if (displayCust) {
      setDisplayCust(false);
      setCres(null);
    } else {
      axios.get("http://localhost:8080/customers")
        .then((response) => {
          setCres(response.data);
          setDisplayCust(true);
        })
        .catch((error) => {
          alert("Couldn't display data");
          console.log(error);
        });
        e.preventDefault();
    }
  };

  const handleClick2 = () => {
    if (displayService) {
      setDisplayService(false);
      setSres(null);

    } else {
      axios({
        method: "GET",
        url: "http://localhost:8080/services",
      })
        .then((response) => {
          setSres(response.data);
          setDisplayService(true);
        })
        .catch((error) => {
          alert("Couldn't display data");
          console.log(error);
        });
    }
  };

  const handleClick3 = () => {
    if (displaySTests) {
      setDisplaySTests(false);
      setStres(null);
    } else {
      axios({
        method: "GET",
        url: "http://localhost:8080/serviceTests",
      })
        .then((response) => {
          setStres(response.data);
          setDisplaySTests(true);
        })
        .catch((error) => {
          alert("Couldn't display data");
          console.log(error);
        });
    }
  };

  const handleClick4 = () => {
    if (displayTests) {
      setDisplayTests(false);
      setTres(null);
    } else {
      axios({
        method: "GET",
        url: "http://localhost:8080/tests",
      })
        .then((response) => {
          setTres(response.data);
          setDisplayTests(true);
        })
        .catch((error) => {
          alert("Couldn't display data");
          console.log(error);
        });
    }
  };

  const handleClick5 = () => {
    if (displayLabs) {
      setLres(null);
      setDisplayLabs(false);
    } else {
      axios({
        method: "GET",
        url: "http://localhost:8080/labs",
      })
        .then((response) => {
          setLres(response.data);
          setDisplayLabs(true);
        })
        .catch((error) => {
          alert("Couldn't display data");
          console.log(error);
        });
    }
  };

  const handleClick6 = () => {
    if (displayTestResults) {
      setTrres(null);
      setDisplayTestResults(false);
    } else {
      axios({
        method: "GET",
        url: "http://localhost:8080/testResults",
      })
        .then((response) => {
          setTrres(response.data);
          setDisplayTestResults(true);
        })
        .catch((error) => {
          alert("Couldn't display data");
          console.log(error);
        });
    }
  };

  const handleClick7 = () => {
    if (displayTestSchedules) {
      setTsres(null);
      setDisplayTestSchedules(false);
    } else {
      axios({
        method: "GET",
        url: "http://localhost:8080/testSchedules",
      })
        .then((response) => {
          setTsres(response.data);
          setDisplayTestSchedules(true);
        })
        .catch((error) => {
          alert("Couldn't display data");
          console.log(error);
        });
    }
  };

  const handleClick8 = () => {
    if (displayTRDetails) {
      setTRdres(null);
      setDisplayTRDetails(false);
    } else {
      axios({
        method: "GET",
        url: "http://localhost:8080/testResultDetails",
      })
        .then((response) => {
          setTRdres(response.data);
          setDisplayTRDetails(true);
        })
        .catch((error) => {
          alert("Couldn't display data");
          console.log(error);
        });
    }
  };
  return (
    <>
      <NavigationBar />
      <button type="button" class="btn btn-primary mt-2" onClick={handleClick1}>
        View Customers
      </button><br/>
      {cres!==null && <Get table="customer" display={displayCust} result={cres} />}

      <button type="button" class="btn btn-primary mt-2" onClick={handleClick2}>
        View Services
      </button><br/>
      {sres!==null && <Get table="service" display={displayService} result={sres} />}

      <button type="button" class="btn btn-primary mt-2" onClick={handleClick3}>
        View Service Tests
      </button><br/>
      {stres!==null && <Get table="service_test_details" display={displaySTests} result={stres} />}

      <button type="button" class="btn btn-primary mt-2" onClick={handleClick4}>
        View Tests
      </button><br/>
      {tres!==null && <Get table="test_master" display={displayTests} result={tres} />}

      <button type="button" class="btn btn-primary mt-2" onClick={handleClick5}>
        View Labs
      </button><br/>
      {lres!==null && <Get table="lab" display={displayLabs} result={lres} />}

      <button type="button" class="btn btn-primary mt-2" onClick={handleClick6}>
        View Test Results
      </button><br/>
      {trres!==null && <Get table="test_result" display={displayTestResults} result={trres} />}

      <button type="button" class="btn btn-primary mt-2" onClick={handleClick7}>
        View Test Schedules
      </button><br/>
      {tsres!==null && <Get table="test_schedule" display={displayTestSchedules} result={tsres} />}

      <button type="button" class="btn btn-primary mt-2" onClick={handleClick8}>
        View Test Result Details
      </button><br/>
      {trdres!==null && <Get table="tr_details" display={displayTRDetails} result={trdres} />}
    </>
  );
}

export default App;
