import { THEME_KEYS } from './theme.types';

import { THEME_ACTION_TYPES } from './theme.types';

const THEME_INITIAL_STATE = {
    themeKey: THEME_KEYS.POWER_RANGERS,
};

export const themeReducer = (state = THEME_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case THEME_ACTION_TYPES.SET_THEME:
            return {
                ...state,
                themeKey: payload,
            }
        default:
            return state;
    }

}

