import {
    LOGOUT,
    POINT_ADDED,
    POINTS_LOADED,
    POINTS_RECALCULATED,
    UPDATE_FIELD_POINT
} from '../actionTypes';

export default (state = {xc: 0, rc: 1, yc: 0}, action) => {
    switch (action.type) {
        case UPDATE_FIELD_POINT:
            return { ...state, [action.key]: action.value };
        case POINT_ADDED:
            return {
                ...state,
                point: action.payload
            };
        case POINTS_LOADED:
            return {
                ...state,
                points: action.payload,
            };
        case POINTS_RECALCULATED:
            return {
                ...state,
                points_r: action.payload,
                current_r: action.r
            };
        case LOGOUT:
            return { ...state, points: undefined};
        default:
            return state;
    }
};
