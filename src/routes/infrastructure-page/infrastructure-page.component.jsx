import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import WallBoxTable from "../../components/wallbox-table/wallbox-table.component";
import CarTable from "../../components/car-table/car-table.component";
import SimulationStartTime from "../../components/plugin-date-picker/plugin-date-picker.component";

import { selectInfrastructureData } from "../../store/infrastructure/infrastructure.selector";
import { addInfrastructureDataStart } from "../../store/infrastructure/infrastructure.action";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Heading, CustomTextField } from "./infrastructure-page.styles";

import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import wallboxImg from "../../assets/wallbox.png";

const defaultInputValues = {
  numberOfWB: 1,
  startTime: dayjs(Date.now()),
  legSizeInMinutes: 15,
  connectionLoad: 20,
};

const InfrastructurePage = () => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const infrastructureData = useSelector(selectInfrastructureData);
  const [tableWbInputValues, setTableWbInputValues] = useState({});
  const [tableCarInputValues, setTableCarInputValues] = useState({});
  const dispatch = useDispatch();
  const carsData = [{id: "Car1", name: "Car 1", maxAcConnectionLoad: 11, tankSize: 60 }, {id: "Car2", name: "Car 2", maxAcConnectionLoad: 11, tankSize: 60 }]
  infrastructureData.cars = carsData
  const { numberOfWB, legSizeInMinutes, connectionLoad, startTime } =
    inputValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onHandleSumbit = (e) => {
    e.preventDefault();

    let wallboxes = [];
    let cars = [];

    for(let i = 0; i < numberOfWB; i++) {
      wallboxes.push({id: `WB${i+1}`, name: `WB ${i+1}`, AcLimit: 11, isActive: true});
      cars.push({id: `Car${i+1}`, name: `Car ${i+1}`, tankSize: 60, maxAcConnectionLoad: 11 });
    }

    dispatch(addInfrastructureDataStart({...inputValues, wallboxes, cars}));
  };

  const onHandleUpdate = () => {
    console.log('Updated wb values:', tableWbInputValues);
    console.log('Updated car values:', tableCarInputValues);

    infrastructureData.cars.forEach(car => {
      if (tableCarInputValues[car.id]) {
        let carUpdate = tableCarInputValues[car.id];
        for (let prop in carUpdate) {
          // Note: Here we check if the property in updates needs to be reflected in the original car object.
          if (prop === 'maxAcConnectionLoad') {
            car.maxAcConnectionLoad = +carUpdate[prop];
          } else if (prop === 'tankSize') {
            car.tankSize = +carUpdate[prop];
          }
        }
      }
    });

    console.log('infrastructuredata', infrastructureData.cars);
  }

  return (
    <Box sx={{ padding: "25px" }}>
      <form style={{ display: "flex", marginBottom: "55px" }} onSubmit={onHandleSumbit}>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "flex-end"}}>
          <CustomTextField
            value={numberOfWB}
            name="numberOfWB"
            onChange={handleChange}
            id="standard-basic"
            label="Number of Wallboxes"
            type="number"
            variant="standard"
          />
          <CustomTextField
            value={legSizeInMinutes}
            name="legSizeInMinutes"
            onChange={handleChange}
            id="standard-basic"
            label="LegSize In Minutes"
            type="number"
            variant="standard"
          />
          <CustomTextField
            value={connectionLoad}
            name="connectionLoad"
            onChange={handleChange}
            id="standard-basic"
            label="connection load"
            type="number"
            variant="standard"
          />
          <SimulationStartTime
            setInputValues={setInputValues}
            startTime={startTime}
          />

          <Button
            sx={{ width: "70px", height: "45px", marginLeft: "35px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
      <Box sx={{ display: "flex", margin: "10px" }}>
        <Heading variant="h4" component="h1">
          WallBoxes
        </Heading>
        <Box
          component="img"
          sx={{ width: "25px", height: "25px", margin: "0 10px" }}
          src={wallboxImg}
          alt="wallbox img"
        />
      </Box>
      {/* infrastructureData={{wallboxes: [{id: "WB1", name: "WB 1", AcLimit: 11 }, {id: "WB2", name: "WB 2", AcLimit: 11 }]} */}
      <WallBoxTable setTableWbInputValues={setTableWbInputValues} infrastructureData={{wallboxes: [{id: "WB1", name: "WB 1", AcLimit: 11 }, {id: "WB2", name: "WB 2", AcLimit: 11 }]}} />

      <Box sx={{ display: "flex", margin: "100px 10px" }}>
        <Heading variant="h4" component="h1">
          Cars
        </Heading>
        <DirectionsCarFilledIcon sx={{marginLeft: "15px"}} />
      </Box>
      {/* {cars: [{id: "Car1", name: "Car 1", maxAcConnectionLoad: 11, tankSize: 60 }, {id: "Car2", name: "Car 2", maxAcConnectionLoad: 11, tankSize: 60 }]} */}
      <CarTable setTableCarInputValues={setTableCarInputValues} infrastructureData={{cars: infrastructureData.cars}} />
      
      <Button
            sx={{ maxWidth: "80px", height: "60px", display:"block", margin: "15px auto", borderRadius: "10px", fontSize: "11px", padding: "0px", fontWeight: "bold"  }}
            type="button"
            variant="contained"
            color="secondary"
            onClick={onHandleUpdate}
          >
            Update
          </Button>
    </Box>
  );
};

export default InfrastructurePage;
