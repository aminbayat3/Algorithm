import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomTextField } from "./styles";
import Button from "@mui/material/Button";
import { getRandomNumberBetween, sortByTime, getEnergyRequired, calculateCarsDataSimulation } from "./app.utils";
import { CONNECTED_LOAD } from "./data";
import ResultTable from "./components/table-result";
import PlugInDatePicker from "./components/plug-in-date-picker";

import { calculateCarsDataStart, calculateCarsDataSuccess } from "./store/configuration/configuration.action";

import { selectStartTime } from "./store/configuration/configuration.selector";
import { selectCarsDataSnapshot } from "./store/configuration/configuration.selector";

const App = () => {
  const dispatch = useDispatch();
  const [numberOfCars, setNumberOfCars] = useState(0);
  const [intervalDuration, setIntervalDuration] = useState(15);
  const [carsData, setCarsData] = useState([]);
  const startTime = useSelector(selectStartTime);
  const carsDataSnapshot = useSelector(selectCarsDataSnapshot);

  useEffect(() => {
    console.log('carsDataSnapshot', carsDataSnapshot)
  }, [carsDataSnapshot]);

  const handleNumOfCarsChange = (e) => {
    setNumberOfCars(e.target.value);
  };

  const handleIntervalDurationChange = (e) => {
    setIntervalDuration(e.target.value);
  }

  const handleSubmit = () => {
    if (+numberOfCars > 0) {
      let carsData = [];
      let plugInEvents = [];
      let plugOutEvents = [];
      let fulfilledEvents = [];
      let connectedCars = [];
      
      for(let i = 0; i < +numberOfCars; i++) {
        const neededEnergy = getRandomNumberBetween(1, 8) * 10;
        const carPlugInTime = startTime.add(getRandomNumberBetween(2, 14), 'hour');
        const carPlugoutTime = carPlugInTime.add(getRandomNumberBetween(4, 22), 'hour');
        const car = {name: `Car${i+1}`, fullEnergy: neededEnergy + getRandomNumberBetween(2, 8) * 10, expectedReadyTime: carPlugoutTime.add(getRandomNumberBetween(1, 5), "hour"),  maxAcConnectionLoad: getRandomNumberBetween(1, 2) * 10, soc: 0}; // needed energy should later move to reservaion class not car class

        plugInEvents.push({ time: carPlugInTime, car: car });
        plugOutEvents.push({ time: carPlugoutTime, car: car});
        fulfilledEvents.push({ time: null, fulfilledEnergy: neededEnergy, car: car});
        //connectionLoad: CONNECTED_LOAD,
        carsData.push(car);
      }

      let endTime = startTime.add(2, 'day');

      const sortedEvents = {
        sortedPlugInEvents: sortByTime(plugInEvents),
        sortedPlugOutEvents: sortByTime(plugOutEvents),
        sortedFulfilledEvents: sortByTime(fulfilledEvents)
      }

      setCarsData(carsData);
      
      dispatch(calculateCarsDataStart({...sortedEvents, startTime, endTime, intervalDuration, connectedCars, connectionLoad: CONNECTED_LOAD }));
    }
  };
 
  return (
    <div className="App">
      <div className="app-container">
      <h5 className="connected-load">Connected Load is : 20 KW</h5>
      <h5 className="max-capacity">Max AC connection load for each car can be different</h5>
        <div className="inputs-container">
          <CustomTextField
            value={numberOfCars}
            onChange={handleNumOfCarsChange}
            id="outlined-number"
            label="Number of Cars"
            type="number"
          />
          <CustomTextField
            value={intervalDuration}
            onChange={handleIntervalDurationChange}
            id="outlined-number"
            label="Interval Duration"
            type="number"
          />
          <PlugInDatePicker />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
      <div className="table-container">
      <ResultTable carsDataSnapshot={carsDataSnapshot} />
      </div>
    </div>
  );
};

export default App;
