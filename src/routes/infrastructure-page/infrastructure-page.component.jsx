import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import ReactJoyride, { STATUS } from "react-joyride";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import WallBoxTable from "../../components/wallbox-table/wallbox-table.component";
import CarTable from "../../components/car-table/car-table.component";
import ConnectionLoadTable from "../../components/connection-load-table/connection-load-table";
import { DateTimePicker as SimulationStartTime } from "../../components/date-time-picker/date-time-picker.component";
import { UpdateButton } from "../../components/update-button/update-button.component";

import { selectInfrastructureData } from "../../store/infrastructure/infrastructure.selector";

import { setNumberOfBadges } from "../../store/infrastructure/infrastructure.action";

import { addInfrastructureDataStart } from "../../store/infrastructure/infrastructure.action";
import { isSameOrBefore } from "../../utils/utils";

import { Box, useStepContext } from "@mui/material";
import Button from "@mui/material/Button";
import { Heading, CustomTextField } from "./infrastructure-page.styles";
import CustomTooltip from "../../components/custom-tool-tip/custom-tool-tip";
import TutorialStep from "../../components/tutorial-steps/tutorial-step.component";
import FortuneWheel from "../../components/fortune-wheel/fortune-wheel.component";

import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import wallboxImg from "../../assets/wallbox.png";
import catOne from "../../assets/cat1.png";
import catTwo from "../../assets/cat2.png";
import catThree from "../../assets/cat3.png";
import catFour from "../../assets/cat4.png";
import catFive from "../../assets/cat5.png";
import progressbarOne from "../../assets/progress-bar-one.png";
import progressbarTwo from "../../assets/progress-bar-two.png";
import progressbarThree from "../../assets/progress-bar-three.png";
import progressbarFour from "../../assets/progress-bar-four.png";
import progressbarFive from "../../assets/progress-bar-five.png";
import progressbarSix from "../../assets/progress-bar-six.png";
import progressbarSeven from "../../assets/progress-bar-seven.png";
import progressbarEight from "../../assets/progress-bar-eight.png";

import {
  TUTORIAL_TEXT_INTRODUCTION,
  TUTORIAL_TEXT_WALLBOX_NUMBER,
  TUTORIAL_TEXT_TASK_ONE_DONE,
  TUTORIAL_TEXT_LEG_DURATION,
  TUTORIAL_TEXT_TASK_TWO_DONE,
  TUTORIAL_TEXT_CONNECTION_LOAD,
  TUTORIAL_TEXT_TASK_THREE_DONE,
  TUTORIAL_TEXT_START_TIME,
  TUTORIAL_TEXT_AC_LIMIT,
  TUTORIAL_TEXT_TANK_SIZE,
  TUTORIAL_TEXT_CONNECTION_LOADS,
  TUTORIAL_TEXT_CAR_AC_LIMIT,
  TUTORIAL_TEXT_CONGRATULATIONS,
} from "../../utils/tutorial-texts";

const defaultInputValues = {
  numberOfWB: null,
  startTime: dayjs().startOf("day"),
  legSizeInMinutes: null,
  connectionLoad: null,
};

const InfrastructurePage = () => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const infrastructureData = useSelector(selectInfrastructureData);
  const [tableWbInputValues, setTableWbInputValues] = useState({});
  const [tableCarInputValues, setTableCarInputValues] = useState({});
  const [tableCLInputValues, setTableCLInputValues] = useState({});

  // react tour
  const [stepIndex, setStepIndex] = useState(0);
  const [taskStatuses, setTaskStatuses] = useState([
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
    { isTaskDone: false },
  ]);
  const [isTutorialCompleted, setIsTutorialCompleted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { width, height } = useWindowSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const dispatch = useDispatch();

  const [run, setRun] = useState(true);

  const stopTour = () => {
    setRun(false);
  };

  const startTour = () => {
    setRun(true);
  };

  const [steps] = useState([
    {
      target: "body",
      content: (
        <TutorialStep
          guidImage={catOne}
          tutorialText={TUTORIAL_TEXT_INTRODUCTION}
          progressBarImage={progressbarOne}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "#numberOfWB",
      content: (
        <TutorialStep
          guidImage={catTwo}
          tutorialText={TUTORIAL_TEXT_WALLBOX_NUMBER}
          progressBarImage={progressbarOne}
        />
      ),
      placement: "bottom",
      requiresCompletion: true,
    },
    {
      target: "body",
      content: (
        <TutorialStep
          guidImage={catTwo}
          tutorialText={TUTORIAL_TEXT_TASK_ONE_DONE}
          progressBarImage={progressbarTwo}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "#legSize",
      content: (
        <TutorialStep
          guidImage={catThree}
          tutorialText={TUTORIAL_TEXT_LEG_DURATION}
          progressBarImage={progressbarTwo}
        />
      ),
      placement: "bottom",
      requiresCompletion: true,
    },
    {
      target: "body",
      content: (
        <TutorialStep
          guidImage={catTwo}
          tutorialText={TUTORIAL_TEXT_TASK_TWO_DONE}
          progressBarImage={progressbarThree}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "#connectionLoad",
      content: (
        <TutorialStep
          guidImage={catTwo}
          tutorialText={TUTORIAL_TEXT_CONNECTION_LOAD}
          progressBarImage={progressbarThree}
        />
      ),
      placement: "bottom",
      requiresCompletion: true,
    },
    {
      target: "body",
      content: (
        <TutorialStep
          guidImage={catTwo}
          tutorialText={TUTORIAL_TEXT_TASK_THREE_DONE}
          progressBarImage={progressbarFour}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "#startTime",
      content: (
        <TutorialStep
          guidImage={catTwo}
          tutorialText={TUTORIAL_TEXT_START_TIME}
          progressBarImage={progressbarFour}
        />
      ),
      placement: "bottom",
      requiresCompletion: true,
    },
    {
      target: "body",
      content: (
        <TutorialStep
          guidImage={catTwo}
          tutorialText={TUTORIAL_TEXT_TASK_THREE_DONE}
          progressBarImage={progressbarFour}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "#WbACLimit",
      content: (
        <TutorialStep
          guidImage={catFour}
          tutorialText={TUTORIAL_TEXT_AC_LIMIT}
          progressBarImage={progressbarFour}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "#TankSize",
      content: (
        <TutorialStep
          guidImage={catThree}
          tutorialText={TUTORIAL_TEXT_TANK_SIZE}
          progressBarImage={progressbarFive}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "#CarACLimit",
      content: (
        <TutorialStep
          guidImage={catTwo}
          tutorialText={TUTORIAL_TEXT_CAR_AC_LIMIT}
          progressBarImage={progressbarSix}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "#connectionLoads",
      content: (
        <TutorialStep
          guidImage={catOne}
          tutorialText={TUTORIAL_TEXT_CONNECTION_LOADS}
          progressBarImage={progressbarSeven}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
    {
      target: "body",
      content: (
        <TutorialStep
          guidImage={catFive}
          tutorialText={TUTORIAL_TEXT_CONGRATULATIONS}
          progressBarImage={progressbarEight}
        />
      ),
      placement: "bottom",
      requiresCompletion: false,
    },
  ]);

  const goToNextStep = () => {
    if (steps[stepIndex].requiresCompletion) {
      stopTour();
    } else if (stepIndex === (steps.length - 2)) {
      setIsTutorialCompleted(true);
      dispatch(setNumberOfBadges(2));
      setStepIndex((prevIndex) => prevIndex + 1);
    }
    else if(stepIndex === (steps.length - 1)) {
      stopTour();
      setIsTutorialCompleted(false);
      setIsFinished(true);
      setIsModalOpen(true);
    }
    else {
      console.log("hittting");
      setStepIndex((prevIndex) => prevIndex + 1);
    }
  };

  const { numberOfWB, legSizeInMinutes, connectionLoad, startTime } =
    inputValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });

    //handling the tour steps
    if (value && (stepIndex > 0 && !taskStatuses[stepIndex - 1].isTaskDone) && !isTutorialCompleted) {
      const currentIndex = stepIndex;
      startTour();
      setTaskStatuses((prevStatuses) => {
        return prevStatuses.map((task, idx) => {
          return idx === currentIndex ? { ...task, isTaskDone: true } : task;
        });
      });

      dispatch(setNumberOfBadges(2));
      setStepIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onHandleDateTimeChange = (value) => {
    setInputValues((prevValue) => ({ ...prevValue, startTime: value }));
  };

  const onHandleDateTimeAccept = (value) => {
    //handling the tour steps
    if (value && (stepIndex && !taskStatuses[stepIndex - 1].isTaskDone) && !isTutorialCompleted) {
      const currentIndex = stepIndex;
      startTour();
      setTaskStatuses((prevStatuses) => {
        return prevStatuses.map((task, idx) => {
          return idx === currentIndex ? { ...task, isTaskDone: true } : task;
        });
      });

      dispatch(setNumberOfBadges(2));
      setStepIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onHandleSumbit = (e) => {
    e.preventDefault();

    let clTime = dayjs(startTime); // connectionLoad Time
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

    dispatch(addInfrastructureDataStart(newInfrastructureData));
  };

  return (
    <Box sx={{ padding: "25px", minWidth: "100vh", position: 'relative' }}>
      {isFinished && (spinCount < 3) && <FortuneWheel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setSpinCount={setSpinCount} /> }
      {isTutorialCompleted && <Confetti width={width} height={height} />}
      <ReactJoyride
        steps={steps}
        stepIndex={stepIndex}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        tooltipComponent={(props) => (
          <CustomTooltip
            {...props}
            stopTour={stopTour}
            goToNextStep={goToNextStep}
          />
        )}
        callback={(data) => {
          const { status } = data;
          const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
          if (finishedStatuses.includes(status)) {
            setRun(false);
          }
        }}
      />
      <form
        style={{ display: "flex", marginBottom: "55px" }}
        onSubmit={onHandleSumbit}
        id="infrastructureForm"
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <CustomTextField
            value={numberOfWB}
            name="numberOfWB"
            onChange={handleChange}
            id="numberOfWB"
            label="Number of Wallboxes"
            type="number"
            variant="standard"
          />
          <CustomTextField
            value={legSizeInMinutes}
            name="legSizeInMinutes"
            onChange={handleChange}
            id="legSize"
            label="LegSize In Minutes"
            type="number"
            variant="standard"
          />
          <CustomTextField
            value={connectionLoad}
            name="connectionLoad"
            onChange={handleChange}
            id="connectionLoad"
            label="connection load"
            type="number"
            variant="standard"
          />
          <SimulationStartTime
            id="startTime"
            onHandleDateTimeChange={onHandleDateTimeChange}
            onHandleDateTimeAccept={onHandleDateTimeAccept}
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
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
          <Box
            id="Wallboxes"
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
            id="WbACLimit"
            setTableWbInputValues={setTableWbInputValues}
            wallboxes={infrastructureData.wallboxes}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
          <Box
            sx={{
              display: "flex",
              margin: "10px",
              justifyContent: "center",
            }}
          >
            <Heading variant="h4" component="h1" id="Cars">
              Cars
            </Heading>
            <DirectionsCarFilledIcon sx={{ marginLeft: "15px" }} />
          </Box>
          <CarTable
            idCar="CarACLimit"
            idTank="TankSize"
            setTableCarInputValues={setTableCarInputValues}
            infrastructureData={infrastructureData}
          >
            <UpdateButton name="Update" onHandleUpdate={onHandleUpdate} />
          </CarTable>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
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
            id="connectionLoads"
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
