import { combineReducers } from "redux";
import { configurationReducer } from "./configuration/configuration.reducer";
import { themeReducer } from "./theme/theme.reducer";
import { wallboxReducer } from "./wallbox/wallbox.reducer";
import { carReducer } from "./car/car.reducer";

export const rootReducer = combineReducers({
 configuration: configurationReducer,
 theme: themeReducer,
 wallbox: wallboxReducer,
 car: carReducer
});