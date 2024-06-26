import { createAction } from "../utils/reducer/reducer.utils"
import { SIMULATION_ACTION_TYPES } from "./simulation.types"

export const setSimulationData = (data) => createAction(SIMULATION_ACTION_TYPES.SET_SIMULATION_DATA, data);

export const emptySimulationData = () => createAction(SIMULATION_ACTION_TYPES.EMPTY_SIMULATION_DATA);