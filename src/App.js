import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomTextField } from "./styles";
import Button from "@mui/material/Button";
import { getRandomNumberBetween, sortCarsByRequiredEnergy, getEnergyRequired } from "./app.utils";
import { CONNECTED_LOAD, MAX_CHARGE_CAPACITY } from "./data";
import ResultTable from "./components/table-result";
import PlugInDatePicker from "./components/plug-in-date-picker";

import { calculateReadyTimesStart } from "./store/configuration/configuration.action";

import { selectPlugInTime } from "./store/configuration/configuration.selector";
import { selectCarsReadyTimes } from "./store/configuration/configuration.selector";

const App = () => {
  const dispatch = useDispatch();
  const [numberOfCars, setNumberOfCars] = useState(0);
  const [carsData, setCarsData] = useState([]);
  const [energyRequired, setEnergyRequired] = useState([]);
  const plugInTime = useSelector(selectPlugInTime);
  const readyTimes = useSelector(selectCarsReadyTimes);

  useEffect(() => {
    console.log('carsData', carsData)
    console.log('energyRequired', energyRequired)
  }, [carsData, energyRequired]);

  const handleNumOfCarsChange = (e) => {
    setNumberOfCars(e.target.value);
  };

  const handleSubmit = () => {
    if (+numberOfCars > 0) {
      let carsData = [];

      let expectedReadyTimes = [];
      let hoursToFullCharge = 0;
      
      for(let i = 0; i < +numberOfCars; i++) {
        carsData.push({name: `Car${i+1}`, energyRequired: getRandomNumberBetween(1, 9) * 10, expectedReadyTime: plugInTime.add(getRandomNumberBetween(8, 18), "hour")});
      }
      const sortedCarsData = sortCarsByRequiredEnergy(carsData);
      const sortedEnergyRequired = getEnergyRequired(sortedCarsData); 

      setCarsData(sortedCarsData);
      setEnergyRequired(sortedEnergyRequired);
      dispatch(calculateReadyTimesStart({sortedEnergyRequired:[0, ...sortedEnergyRequired], expectedReadyTimes, connectedLoad: CONNECTED_LOAD, maxChargeCapacity: MAX_CHARGE_CAPACITY, numberOfCars: carsData.length, hoursToFullCharge }))
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
      <ResultTable carsData={carsData} carsReadyTimes={readyTimes} />
      </div>
    </div>
  );
};

export default App;
