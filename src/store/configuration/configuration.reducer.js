import dayjs from "dayjs";
import { CONFIGURATION_ACTION_TYPES } from "./configuration.types";

const CONFIGURATION_INITIAL_STATE = {
    startTime: dayjs(Date.now()),
    carsDataSnapshot: [],
    error: null,
}

export const configurationReducer = (state = CONFIGURATION_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CONFIGURATION_ACTION_TYPES.SET_START_TIME: 
            return {
                ...state,
                startTime: payload,
            }
        case CONFIGURATION_ACTION_TYPES.CALCULATE_CARS_DATA_SUCCESS:
            return {
                ...state,
                carsDataSnapshot: payload,
            }
        case CONFIGURATION_ACTION_TYPES.CALCULATE_CARS_DATA_FAILED:
            return {
                ...state,
                error: payload,
            }
        default:
            return state;
    }
}