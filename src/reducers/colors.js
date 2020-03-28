import {
    CHANGE_COLORS
} from '../actionTypes';

export default (state = {colorV : '#FC88DA', oppositeColor : '#037725'}, action) => {
    switch (action.type) {
        case CHANGE_COLORS:
            return {
                ...state,
                colorV: action.colorV,
                oppositeColor: action.oppositeColor
            };
        default:
            return state;
    }
};
