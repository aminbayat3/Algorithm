import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomTextField } from "./styles";
import Button from "@mui/material/Button";
import { getRandomNumberBetween, sortCarsByPluginTime, getEnergyRequired, calculateReadyTimesWithSimulation } from "./app.utils";
import { CONNECTED_LOAD } from "./data";
import ResultTable from "./components/table-result";
import PlugInDatePicker from "./components/plug-in-date-picker";

import { calculateReadyTimesStart, calculateReadyTimesSuccess } from "./store/configuration/configuration.action";

import { selectStartTime } from "./store/configuration/configuration.selector";
import { selectCarsReadyTimes } from "./store/configuration/configuration.selector";

const App = () => {
  const dispatch = useDispatch();
  const [numberOfCars, setNumberOfCars] = useState(0);
  const [intervalDuration, setIntervalDuration] = useState(15);
  const [carsData, setCarsData] = useState([]);
  const [energyRequired, setEnergyRequired] = useState([]);
  const startTime = useSelector(selectStartTime);
  const readyTimes = useSelector(selectCarsReadyTimes);

  useEffect(() => {
    console.log('carsData', carsData)
    console.log('energyRequired', energyRequired)
  }, [carsData, energyRequired]);

  useEffect(() => {
    console.log('redytimes', readyTimes)
  }, [readyTimes]);

  const handleNumOfCarsChange = (e) => {
    setNumberOfCars(e.target.value);
  };

  const handleIntervalDurationChange = (e) => {
    setIntervalDuration(e.target.value);
  }

  const handleSubmit = () => {
    if (+numberOfCars > 0) {
      let carsData = [];
      let connectedCars = [];
      
      for(let i = 0; i < +numberOfCars; i++) {
        const neededEnergy = getRandomNumberBetween(1, 9) * 10;
        const carPlugInTime = startTime.add(getRandomNumberBetween(2, 14), 'hour');
        const carPlugoutTime = carPlugInTime.add(getRandomNumberBetween(4, 22), 'hour');
        carsData.push({name: `Car${i+1}`, connectionLoad: CONNECTED_LOAD, isPlugedIn: false, isPlugedOut: false, isNeedMet: false, energyRequired: neededEnergy, fullEnergy: neededEnergy + getRandomNumberBetween(2, 8) * 10, plugInTime: carPlugInTime, plugOutTime: carPlugoutTime, fulfilledTime: null ,maxAcConnectionLoad: getRandomNumberBetween(1, 2.2) * 10, soc: 0, expectedReadyTime: carPlugoutTime.add(getRandomNumberBetween(2, 5), "hour") });
      }

      let endTime = startTime.add(2, 'day');
      // const sortedCarsData = sortCarsByRequiredEnergy(carsData);
      const sortedCarsData = sortCarsByPluginTime(carsData);
      const sortedEnergyRequired = getEnergyRequired(sortedCarsData); 
      // const sortedPluginTimes = getPluginTimes(sortedCarsData);

      // console.log('pluginTimes', sortedPluginTimes.map(p => p.format('YYYY.MM.DD HH:mm')));

      setCarsData(sortedCarsData);
      setEnergyRequired(sortedEnergyRequired);

      // dispatch(calculateReadyTimesStart({sortedEnergyRequired: sortedEnergyRequired, numberOfCars: carsData.length, plugInTime: plugInTime.toISOString(), maxChargeCapacity: MAX_CHARGE_CAPACITY }));
      dispatch(calculateReadyTimesSuccess(calculateReadyTimesWithDifferentPluginTimes(sortedEnergyRequired, sortedPluginTimes, CONNECTED_LOAD, carsData.length)))
      // console.log(calculateReadyTimesSuccess(calculateReadyTimesWithDifferentPluginTimes([80, 30, 70], ['2024.03.02 12:00', '2024.03.02 19:00', '2024.03.02 20:00'], CONNECTED_LOAD, 3)));
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
      <ResultTable carsData={carsData} carsReadyTimes={readyTimes} />
      </div>
    </div>
  );
};

export default App;
