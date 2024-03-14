import { createAction } from "../utils/reducer/reducer.utils";
import { CONFIGURATION_ACTION_TYPES } from "./configuration.types";

export const setStartTime = (startTime) => createAction(CONFIGURATION_ACTION_TYPES.SET_START_TIME, startTime);

export const calculateCarsDataStart = (carsData) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_CARS_DATA_START, carsData);

export const calculateCarsDataSuccess = (carsDataSnapshot) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_CARS_DATA_SUCCESS, carsDataSnapshot); 

export const calculateCarsDataFailed = (error) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_CARS_DATA_FAILED, error);
