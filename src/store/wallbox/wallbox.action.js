import { createAction } from "../utils/reducer/reducer.utils";

import { WALLBOX_ACTION_TYPES } from "./wallbox.types";

export const addWallboxesStart = (wallboxes) => {
    return createAction(WALLBOX_ACTION_TYPES.ADD_WALLBOXES_START, wallboxes);
}

export const addWallboxesSuccess = (wallboxes) => {
    return createAction(WALLBOX_ACTION_TYPES.ADD_WALLBOXES_SUCCESS, wallboxes);
}

export const addWallboxesFailed = (error) => {
    return createAction(WALLBOX_ACTION_TYPES.ADD_WALLBOXES_FAILED, error);
}

export const addWallboxStart = (wallbox) => {
    return createAction(WALLBOX_ACTION_TYPES.ADD_WALLBOX_START, wallbox);
}
export const addWallboxSuccess = (wallbox) => {
    return createAction(WALLBOX_ACTION_TYPES.ADD_WALLBOX_SUCCESS, wallbox);
}
export const addWallboxFailed = (error) => {
    return createAction(WALLBOX_ACTION_TYPES.ADD_WALLBOX_FAILED, error);
}

export const updateWallboxStart = (newWallbox) => {
    return createAction(WALLBOX_ACTION_TYPES.UPDATE_WALLBOX_START, newWallbox);
}
export const updateWallboxSuccess = (newWallbox) => {
    return createAction(WALLBOX_ACTION_TYPES.ADD_WALLBOX_SUCCESS, newWallbox);
}
export const updateWallboxFailed = (error) => {
    return createAction(WALLBOX_ACTION_TYPES.UPDATE_WALLBOX_FAILED, error);
}