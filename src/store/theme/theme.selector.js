import { createSelector } from "reselect";

const selectThemeReducer = (state) => state.theme;

export const selectThemeKey = createSelector(
    [selectThemeReducer],
    (theme) => theme.themeKey
);