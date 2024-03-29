import { SIMULATION_ACTION_TYPES } from "./simulation.types"

export const addMessage = (message) => createAction(SIMULATION_ACTION_TYPES.ADD_MESSAGE, message)