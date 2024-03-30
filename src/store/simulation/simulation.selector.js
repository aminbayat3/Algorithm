import { createSelector } from "reselect";

export const selectSimulationReducer = (state) => state.simulation;

export const selectSimulationData = createSelector(
    [selectSimulationReducer],
    (simulation) => simulation.simulationData
);