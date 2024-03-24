import { createSelector } from "reselect";

const selectCarReducer = (state) => state.car;

export const selectCars = createSelector(
    [selectCarReducer],
    (car) => car.cars
);

export const selectCarError = createSelector(
    [selectCarReducer],
    (car) => car.error
);