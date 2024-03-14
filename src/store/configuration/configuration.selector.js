import { createSelector } from "reselect";

export const selectConfigurationReducer = (state) => state.configuration;

export const selectStartTime = createSelector(
    [selectConfigurationReducer],
    (configuration) => configuration.startTime
);

export const selectCarsDataSnapshot = createSelector(
    [selectConfigurationReducer],
    (configuration) => configuration.carsDataSnapshot
);