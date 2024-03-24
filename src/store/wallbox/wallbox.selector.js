import { createSelector } from "reselect";

const selectWallboxReducer = (state) => state.wallbox;

export const selectWallboxes = createSelector(
    [selectWallboxReducer],
    (wallbox) => wallbox.wallboxes
);

export const selectWallboxError = createSelector(
    [selectWallboxReducer],
    (wallbox) => wallbox.error
);