import { createSelector } from "reselect";

export const selectConfigurationReducer = (state) => state.configuration;

export const selectPlugInTime = createSelector(
    [selectConfigurationReducer],
    (configuration) => configuration.plugInTime
);

export const selectCarsReadyTimes = createSelector(
    [selectConfigurationReducer],
    (configuration) => configuration.readyTimes
);