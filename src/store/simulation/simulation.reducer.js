
import { SIMULATION_ACTION_TYPES } from "./simulation.types";

const SIMULATION_INITIAL_STATE = {
    simulationData: [],
}

export const simulationReducer = (state = SIMULATION_INITIAL_STATE, action) => {
    const { type, payload } = action;

  switch (type) {
    case SIMULATION_ACTION_TYPES.SET_SIMULATION_DATA:
      return {
        ...state,
        simulationData: [...state.simulationData, payload],
      };
    default:
      return state;
  }
};
