import { createAction } from "../../utils";
import { CONFIGURATION_ACTION_TYPES } from "./configuration.types";

export const setPlugIn = (plugInTime) => {
    return createAction(CONFIGURATION_ACTION_TYPES.SET_PLUG_IN, plugInTime); 
}
