import { createSelector } from "reselect";

export const selectInfrastructureReducer = (state) => state.infrastructure;

export const selectInfrastructureData = createSelector(
    [selectInfrastructureReducer],
    (infrastructure) => infrastructure.infrastructureData
);

export const selectNumOfCars = createSelector(
    [selectInfrastructureData],
    (infrastructureData) => infrastructureData.cars.length
);

export const selectWallboxes = createSelector(
    [selectInfrastructureData],
    (infrastructureData) => infrastructureData.wallboxes
);

export const selectstartTime = createSelector(
    [selectInfrastructureData],
    (infrastructureData) => infrastructureData.startTime
);



