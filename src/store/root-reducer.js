import { combineReducers } from "redux";
import { configurationReducer } from "./configuration/configuration.reducer";

export const rootReducer = combineReducers({
 configuration: configurationReducer,
});