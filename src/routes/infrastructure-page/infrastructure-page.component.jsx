import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import WallBoxTable from "../../components/wallbox-table/wallbox-table.component";
import CarTable from "../../components/car-table/car-table.component";
import ConnectionLoadTable from "../../components/connection-load-table/connection-load-table";
import { DateTimePicker as SimulationStartTime } from "../../components/date-time-picker/date-time-picker.component";
import { UpdateButton } from "../../components/update-button/update-button.component";

import { selectInfrastructureData } from "../../store/infrastructure/infrastructure.selector";
import {
  addInfrastructureDataStart,
  updateInfrastructureStart,
} from "../../store/infrastructure/infrastructure.action";
import { isSameOrBefore } from "../../utils/utils";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Heading, CustomTextField } from "./infrastructure-page.styles";

import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
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
  const [tableCLInputValues, setTableCLInputValues] = useState({});
  const dispatch = useDispatch();

  const { numberOfWB, legSizeInMinutes, connectionLoad, startTime } =
    inputValues;

  useEffect(() => {
    console.log(infrastructureData);
  }, [infrastructureData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onHandleDateTimeChange = (value) => {
    setInputValues((prevValue) => ({ ...prevValue, startTime: value }));
  };

  const onHandleSumbit = (e) => {
    e.preventDefault();

    let clTime = startTime; // connectionLoad Time
    let endTime = startTime.add(2, "day");
    let wallboxes = [];
    let cars = [];
    let connectionLoads = [];

    for (let i = 0; i < numberOfWB; i++) {
      wallboxes.push({
        id: `WB${i + 1}`,
        name: `WB ${i + 1}`,
        acLimit: 11,
        isActive: true,
      });
      cars.push({
        id: `Car${i + 1}`,
        name: `Car ${i + 1}`,
        tankSize: 60,
        maxAcConnectionLoad: 11,
      });
    }

    let counter = 1;
    while (isSameOrBefore(dayjs(clTime), dayjs(endTime))) {
      connectionLoads.push({
        id: `CL${counter}`,
        time: dayjs(clTime),
        value: connectionLoad,
      });
      clTime = dayjs(clTime).add(1, "hour");
      counter++;
    }

    dispatch(
      addInfrastructureDataStart({
        legDuration: legSizeInMinutes,
        connectionLoads,
        startTime,
        wallboxes,
        cars,
        endTime,
      })
    );
  };

  const onHandleUpdate = () => {
    // console.log("Updated wb values:", tableWbInputValues);
    // console.log("Updated car values:", tableCarInputValues);
    // console.log("Updated CL values:", tableCLInputValues);

    //later we need to move it to a function
    const updatedCars = infrastructureData.cars.map((car) => {
      if (tableCarInputValues[car.id]) {
        let carUpdate = tableCarInputValues[car.id];
        // Create a copy of the car object to avoid mutating the original
        let updatedCar = { ...car };
        for (let prop in carUpdate) {
          if (prop === "maxAcConnectionLoad") {
            updatedCar.maxAcConnectionLoad = +carUpdate[prop];
          } else if (prop === "tankSize") {
            updatedCar.tankSize = +carUpdate[prop];
          }
        }
        return updatedCar;
      }
      return car;
    });

    // Create a new array of wallboxes with updated properties
    const updatedWallboxes = infrastructureData.wallboxes.map((wallbox) => {
      if (tableWbInputValues[wallbox.id]) {
        let wallboxUpdate = tableWbInputValues[wallbox.id];
        // Create a copy of the wallbox object to avoid mutating the original
        let updatedWallbox = { ...wallbox };
        for (let prop in wallboxUpdate) {
          if (prop === "acLimit") {
            updatedWallbox.acLimit = +wallboxUpdate[prop];
          }
        }
        return updatedWallbox;
      }
      return wallbox;
    });

    const updateConnectionLoads = infrastructureData.connectionLoads.map(
      (cl) => {
        if (tableCLInputValues[cl.id]) {
          let clUpdate = tableCLInputValues[cl.id];

          let updatedCl = { ...cl };
          for (let prop in clUpdate) {
            if (prop === "value") {
              updatedCl.value = +clUpdate[prop];
            }
          }
          return updatedCl;
        }
        return cl;
      }
    );

    // Create a new infrastructureData object with the updated arrays
    const newInfrastructureData = {
      ...infrastructureData,
      cars: updatedCars,
      wallboxes: updatedWallboxes,
      connectionLoads: updateConnectionLoads,
    };

    dispatch(updateInfrastructureStart(newInfrastructureData));
  };

  return (
    <Box sx={{ padding: "25px" }}>
      <form
        style={{ display: "flex", marginBottom: "55px" }}
        onSubmit={onHandleSumbit}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
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
            onHandleDateTimeChange={onHandleDateTimeChange}
            label="Start Time"
            value={startTime}
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

      {/* Tables */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              margin: "10px",
              justifyContent: "center",
            }}
          >
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
          <WallBoxTable
            setTableWbInputValues={setTableWbInputValues}
            infrastructureData={infrastructureData}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              margin: "10px",
              justifyContent: "center",
            }}
          >
            <Heading variant="h4" component="h1">
              Cars
            </Heading>
            <DirectionsCarFilledIcon sx={{ marginLeft: "15px" }} />
          </Box>
          <CarTable
            setTableCarInputValues={setTableCarInputValues}
            infrastructureData={infrastructureData}
          >
            <UpdateButton name="Update" onHandleUpdate={onHandleUpdate} />
          </CarTable>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              margin: "10px",
              justifyContent: "center",
            }}
          >
            <Heading variant="h4" component="h1">
              CL
            </Heading>
            <BatteryChargingFullIcon sx={{ marginLeft: "15px" }} />
          </Box>
          <ConnectionLoadTable
            setTableCLInputValues={setTableCLInputValues}
            infrastructureData={infrastructureData}
            connectionLoad={connectionLoad}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default InfrastructurePage;
