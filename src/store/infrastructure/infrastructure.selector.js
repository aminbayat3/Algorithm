import { createSelector } from "reselect";

export const selectInfrastructureReducer = (state) => state.infrastructure;

export const selectInfrastructureData = createSelector(
    [selectInfrastructureReducer],
    (infrastructure) => infrastructure.infrastructureData
);

export const selectCars = createSelector(
    [selectInfrastructureData],
    (infrastructureData) => infrastructureData.cars
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

export const selectNumOfBadges = createSelector(
    [selectInfrastructureReducer],
    (infrastructure) => infrastructure.numOfBadges
)

export const selectChosenElement = createSelector(
    [selectInfrastructureReducer],
    (infrastructure) => infrastructure.chosenElement
)

export const selectIsSuccessful = createSelector(
    [selectInfrastructureReducer],
    (infrastructure) => infrastructure.isSuccessful
)

export const selectShowDiscount = createSelector(
    [selectInfrastructureReducer],
    (infrastructure) => infrastructure.showDiscount
)




