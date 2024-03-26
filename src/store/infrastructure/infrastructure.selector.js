import { createSelector } from "reselect";

export const selectInfrastructureReducer = (state) => state.infrastructure;

export const selectInfrastructureData = createSelector(
    [selectInfrastructureReducer],
    (infrastructure) => infrastructure.infrastructureData
);



