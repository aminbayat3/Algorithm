import "./App.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomTextField } from "./styles";
import Button from "@mui/material/Button";
import { calculateReadyTimes, getRandomNumberBetween, sortCarsByRequiredEnergy, getEnergyRequired } from "./app.utils";
import { CONNECTED_LOAD } from "./data";
import ResultTable from "./components/table-result";
import PlugInDatePicker from "./components/plug-in-date-picker";

import { selectPlugInTime } from "./store/configuration/configuration.selector";

const App = () => {
  const [numberOfCars, setNumberOfCars] = useState(0);
  const [tripReadyTimes, setTripReadyTimes] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [energyRequired, setEnergyRequired] = useState([]);
  const plugInTime = useSelector(selectPlugInTime);

  useEffect(() => {
    console.log('tripReadyTimes', tripReadyTimes)
    console.log('carsData', carsData)
    console.log('energyRequired', energyRequired)
  }, [tripReadyTimes, carsData, energyRequired]);

  const handleNumOfCarsChange = (e) => {
    setNumberOfCars(e.target.value);
  };

  const handleSubmit = () => {
    if (+numberOfCars > 0) {
      let carsData = [];

      let readyTimeArray = [];
      let total = 0;
      
      for(let i = 0; i < +numberOfCars; i++) {
        carsData.push({name: `Car${i+1}`, energyRequired: getRandomNumberBetween(1, 9) * 10, expectedReadyTime: plugInTime.add(getRandomNumberBetween(6, 10), "hour")});
      }
      const sortedCarsData = sortCarsByRequiredEnergy(carsData);
      const sortedEnergyRequired = getEnergyRequired(sortedCarsData); 

      setCarsData(sortedCarsData);
      setEnergyRequired(sortedEnergyRequired);
      setTripReadyTimes(calculateReadyTimes([0, ...sortedEnergyRequired], CONNECTED_LOAD, carsData.length, total, readyTimeArray));
      //setTripReadyTimes(calculateReadyTimes([0, 30, 50, 80], CONNECTED_LOAD, 3, total, readyTimeArray)); // now try the algorithm with some dummy data
      // console.log('maainn', calculateReadyTimes([0, 30, 50, 80], CONNECTED_LOAD, 3, total, readyTimeArray));
    }
  };

  return (
    <div className="App">
      <div className="app-container">
      <h5 className="connected-load">Connected Load is : 20 KW</h5>
      <h5 className="max-capacity">Max Charge Capacity is : 11 KW</h5>
        <div className="inputs-container">
          <CustomTextField
            value={numberOfCars}
            onChange={handleNumOfCarsChange}
            id="outlined-number"
            label="Number of Cars"
            type="number"
          />
          <PlugInDatePicker />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
      <div className="table-container">
      <ResultTable carsData={carsData} tripReadyTimes={tripReadyTimes} />
      </div>
    </div>
  );
};

export default App;
