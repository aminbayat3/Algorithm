
import { SIMULATION_ACTION_TYPES } from "./simulation.types";

const SIMULATION_INITIAL_STATE = {
    messages: [],
}

export const simulationReducer = (state = SIMULATION_INITIAL_STATE, action) => {
    const { type, payload } = action;

  switch (type) {
    case SIMULATION_ACTION_TYPES.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    default:
      return state;
  }
};
