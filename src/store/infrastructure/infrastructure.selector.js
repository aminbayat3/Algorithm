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



