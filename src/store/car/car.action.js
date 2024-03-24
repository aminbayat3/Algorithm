import { createAction } from "../utils/reducer/reducer.utils";

import { CAR_ACTION_TYPES } from "./car.types";

export const addCarStart = (car) => {
    return createAction(CAR_ACTION_TYPES.ADD_CAR_START, car);
}
export const addCarSuccess = (car) => {
    return createAction(CAR_ACTION_TYPES.ADD_CAR_SUCCESS, car);
}
export const addCarFailed = (error) => {
    return createAction(CAR_ACTION_TYPES.ADD_CAR_FAILED, error);
}

export const updateCarStart = (newCar) => {
    return createAction(CAR_ACTION_TYPES.UPDATE_CAR_START, newCar);
}
export const updateCarSuccess = (newCar) => {
    return createAction(CAR_ACTION_TYPES.UPDATE_CAR_SUCCESS, newCar);
}
export const updateCarFailed = (error) => {
    return createAction(CAR_ACTION_TYPES.UPDATE_CAR_FAILED, error);
}