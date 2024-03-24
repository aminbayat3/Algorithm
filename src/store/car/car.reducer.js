import { CAR_ACTION_TYPES } from "./car.types";

import { updateEntities } from "../utils/reducer/reducer.utils";

const CAR_INITIAL_STATE = {
    cars: [],
    error: null,
};

export const carReducer = (state = CAR_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CAR_ACTION_TYPES.ADD_CAR_SUCCESS:
            return {
                ...state,
                cars: [...state.cars, payload],
            }
        case CAR_ACTION_TYPES.UPDATE_CAR_SUCCESS: 
            return {
                ...state,
                cars: updateEntities(state.cars, payload)
            }

        case CAR_ACTION_TYPES.ADD_CAR_FAILED:
        case CAR_ACTION_TYPES.UPDATE_CAR_FAILED:
            return {
                ...state,
                error: payload,
            }

        default:
            return state;
    }

}