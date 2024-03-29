import { combineReducers } from "redux";
import { themeReducer } from "./theme/theme.reducer";
import { wallboxReducer } from "./wallbox/wallbox.reducer";
import { carReducer } from "./car/car.reducer";
import { infrastructureReducer } from "./infrastructure/infrastructure.reducer";
import { ReservationReducer } from "./reservation/reservation.reducer";
import { simulationReducer } from "./simulation/simulation.reducer";

export const rootReducer = combineReducers({
 theme: themeReducer,
 wallbox: wallboxReducer,
 car: carReducer,
 infrastructure: infrastructureReducer,
 reservation: ReservationReducer,
 simulation: simulationReducer
});