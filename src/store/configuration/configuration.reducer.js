import dayjs from "dayjs";
import { CONFIGURATION_ACTION_TYPES } from "./configuration.types";

const CONFIGURATION_INITIAL_STATE = {
    plugInTime: dayjs(Date.now()),
    readyTimes: [],
    error: null,
}

export const configurationReducer = (state = CONFIGURATION_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CONFIGURATION_ACTION_TYPES.SET_PLUG_IN: 
            return {
                ...state,
                plugInTime: payload,
            }
        case CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_SUCCESS:
            return {
                ...state,
                readyTimes: payload,
            }
        case CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_FAILED:
            return {
                ...state,
                error: payload,
            }
        default:
            return state;
    }
}