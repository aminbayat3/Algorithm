import "./App.css";
import { useEffect, useState } from "react";
import { CustomTextField } from "./styles";
import Button from "@mui/material/Button";
import { calculateEnergyRecursive, getRandomNumberBetween, sortCarsByHourToFull, getRemainingTimes } from "./app.utils";
import { CONNECTED_LOAD } from "./data";
import ResultTable from "./table-result";

const App = () => {
  const [numberOfCars, setNumberOfCars] = useState(0);
  const [carsEnergy, setCarsEnergy] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [remainingTime, setRemainingTime] = useState([]);

  useEffect(() => {
    console.log('carsEnergy', carsEnergy)
    console.log('carsData', carsData)
    console.log('remainingTime', remainingTime)
  }, [carsEnergy, carsData, remainingTime]);

  const handleNumOfCarsChange = (e) => {
    setNumberOfCars(e.target.value);
  };

  const handleSubmit = () => {
    if (+numberOfCars > 0) {
      let carsData = [];

      let energyArray = [];
      let total = 0;
      
      for(let i = 0; i < +numberOfCars; i++) {
        carsData.push({name: `Car${i+1}`, hourToFull: getRandomNumberBetween(2, 10)});
      }
      const sortedCarsData = sortCarsByHourToFull(carsData);
      const sortedRemainingTime = getRemainingTimes(sortedCarsData); 

      setCarsData(sortedCarsData);
      setRemainingTime(sortedRemainingTime);
      setCarsEnergy(calculateEnergyRecursive([0, ...sortedRemainingTime], CONNECTED_LOAD, carsData.length, total, energyArray));
    }
  };

  return (
    <div className="App">
      <div className="app-container">
      <h5 className="connected-load">Connected Load is : 20</h5>
        <div className="inputs-container">
          <CustomTextField
            value={numberOfCars}
            onChange={handleNumOfCarsChange}
            id="outlined-number"
            label="Number of Cars"
            type="number"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
      <div className="table-container">
      <ResultTable carsData={carsData} energyArray={carsEnergy} />
      </div>
      
    </div>
  );
};

export default App;
