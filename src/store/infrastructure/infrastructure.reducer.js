import dayjs from "dayjs";
import { INFRASTRUCTURE_ACTION_TYPES } from "./infrastructure.types";

const INFRASTRUCTURE_INITIAL_STATE = {
  infrastructureData: {
    startTime: null,
    endTime: null,
    legSizeInMinutes: 15,
    connectionLoads: [],
    wallboxes: [],
    cars: [],
  },
  error: null,
  numOfBadges : 0,
};

export const infrastructureReducer = (
  state = INFRASTRUCTURE_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case INFRASTRUCTURE_ACTION_TYPES.SET_INFRASTRUCTURE_DATA:
      return {
        ...state,
        infrastructureData: payload,
      }
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
    case INFRASTRUCTURE_ACTION_TYPES.SET_NUMBER_OF_BADGES:
      return {
        ...state,
        numOfBadges: state.numOfBadges + payload,
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
