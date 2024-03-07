import { createAction } from "../utils/reducer/reducer.utils";
import { CONFIGURATION_ACTION_TYPES } from "./configuration.types";

export const setStartTime = (startTime) => createAction(CONFIGURATION_ACTION_TYPES.SET_START_TIME, startTime);

export const calculateReadyTimesStart = (carsData) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_START, carsData);

export const calculateReadyTimesSuccess = (readyTimes) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_SUCCESS, readyTimes); 

export const calculateReadyTimesFailed = (error) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_FAILED, error);
