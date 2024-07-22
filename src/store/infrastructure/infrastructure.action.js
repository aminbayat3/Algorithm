import { create } from "@mui/material/styles/createTransitions";
import { createAction } from "../utils/reducer/reducer.utils";
import { INFRASTRUCTURE_ACTION_TYPES } from "./infrastructure.types";

export const getInfrastructureStart = () => createAction(INFRASTRUCTURE_ACTION_TYPES.GET_INFRASTRUCTURE_DATA_START);
export const getInfrastructureSuccess = (infrastructureData) => createAction(INFRASTRUCTURE_ACTION_TYPES.GET_INFRASTRUCTURE_DATA_SUCCESS, infrastructureData);
export const getInfrastructureFailed = (error) => createAction(INFRASTRUCTURE_ACTION_TYPES.GET_INFRASTRUCTURE_DATA_FAILED, error);

export const addInfrastructureDataStart = (infrastructureData) => createAction(INFRASTRUCTURE_ACTION_TYPES.ADD_INFRASTRUCTURE_DATA_START, infrastructureData);
export const addInfrastructureDataSuccess = (infrastructureData) => createAction(INFRASTRUCTURE_ACTION_TYPES.ADD_INFRASTRUCTURE_DATA_SUCCESS, infrastructureData);
export const addInfrastructureDataFailed = (error) => createAction(INFRASTRUCTURE_ACTION_TYPES.ADD_INFRASTRUCTURE_DATA_FAILED, error);

export const updateInfrastructureStart = (infrastructureData) => createAction(INFRASTRUCTURE_ACTION_TYPES.UPDATE_INFRASTRUCTURE_DATA_START, infrastructureData);
export const updateInfrastructureSuccess = (infrastructureData) => createAction(INFRASTRUCTURE_ACTION_TYPES.UPDATE_INFRASTRUCTURE_DATA_SUCCESS, infrastructureData);
export const updateInfrastructureFailed = (error) => createAction(INFRASTRUCTURE_ACTION_TYPES.UPDATE_INFRASTRUCTURE_DATA_FAILED, error);

export const setInfratructureData = (data) => createAction(INFRASTRUCTURE_ACTION_TYPES.SET_INFRASTRUCTURE_DATA, data);

export const setNumberOfBadges = (numberOfBadges) => createAction(INFRASTRUCTURE_ACTION_TYPES.SET_NUMBER_OF_BADGES, numberOfBadges);

export const setChosenElement = (data) => createAction(INFRASTRUCTURE_ACTION_TYPES.SET_CHOSEN_ELEMENT, data);

export const setIsSuccessful = (data) => createAction(INFRASTRUCTURE_ACTION_TYPES.SET_IS_SUCCESSFUL, data);

export const setShowDiscount = (boolean) => createAction(INFRASTRUCTURE_ACTION_TYPES.SET_SHOW_DISCOUNT, boolean);