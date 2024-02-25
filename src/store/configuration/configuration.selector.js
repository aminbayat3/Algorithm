import { createSelector } from "reselect";

export const selectConfigurationReducer = (state) => state.configuration;

export const selectPlugInTime = createSelector(
    [selectConfigurationReducer],
    (configuration) => configuration.plugInTime
);