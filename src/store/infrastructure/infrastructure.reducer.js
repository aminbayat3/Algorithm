import dayjs from "dayjs";
import { INFRASTRUCTURE_ACTION_TYPES } from "./infrastructure.types";

const INFRASTRUCTURE_INITIAL_STATE = {
  infrastructureData: {
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now).add(2, "day"),
    legSizeInMinutes: 15,
    connectionLoads: [],
    wallboxes: [],
    cars: [],
  },
  error: null,
};

export const infrastructureReducer = (
  state = INFRASTRUCTURE_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case INFRASTRUCTURE_ACTION_TYPES.GET_INFRASTRUCTURE_DATA_SUCCESS:
      return {
        ...state,
        infrastructureData: payload,
      };
    case INFRASTRUCTURE_ACTION_TYPES.ADD_INFRASTRUCTURE_DATA_SUCCESS:
        return {
            ...state,
            infrastructureData: payload
        };
    case INFRASTRUCTURE_ACTION_TYPES.UPDATE_INFRASTRUCTURE_DATA_SUCCESS:
        return {
            ...state,
            infrastructureData: payload,
        }

    case INFRASTRUCTURE_ACTION_TYPES.ADD_INFRASTRUCTURE_DATA_FAILED:
    case INFRASTRUCTURE_ACTION_TYPES.GET_INFRASTRUCTURE_DATA_FAILED:
    case INFRASTRUCTURE_ACTION_TYPES.UPDATE_INFRASTRUCTURE_DATA_FAILED:
        return {
            ...state,
            error: payload,
        }

    default:
      return state;
  }
};
