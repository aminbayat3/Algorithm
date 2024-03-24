import { WALLBOX_ACTION_TYPES } from "./wallbox.types";

import { updateEntities } from "../utils/reducer/reducer.utils";

const WALLBOX_INITIAL_STATE = {
    wallboxes: [],
    error: null,
};

export const wallboxReducer = (state = WALLBOX_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case WALLBOX_ACTION_TYPES.ADD_WALLBOX_SUCCESS:
            return {
                ...state,
                wallboxes: [...state.wallboxes, payload],
            }
        case WALLBOX_ACTION_TYPES.UPDATE_WALLBOX_SUCCESS: 
            return {
                ...state,
                wallboxes: updateEntities(state.wallboxes, payload)
            }

        case WALLBOX_ACTION_TYPES.ADD_WALLBOX_FAILED:
        case WALLBOX_ACTION_TYPES.UPDATE_WALLBOX_FAILED:
            return {
                ...state,
                error: payload,
            }

        default:
            return state;
    }

}