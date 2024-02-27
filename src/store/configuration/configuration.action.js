import { createAction } from "../utils/reducer/reducer.utils";
import { CONFIGURATION_ACTION_TYPES } from "./configuration.types";

export const setPlugIn = (plugInTime) => createAction(CONFIGURATION_ACTION_TYPES.SET_PLUG_IN, plugInTime);

export const calculateReadyTimesStart = (carsData) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_START, carsData);

export const calculateReadyTimesSuccess = (readyTimes) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_SUCCESS, readyTimes); 

export const calculateReadyTimesFailed = (error) => createAction(CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_FAILED, error);
