import {
    LOGIN,
    ASYNC_START,
    UPDATE_FIELD_AUTH
} from '../actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.message : null
            };
        case ASYNC_START:
            if (action.subtype === LOGIN) {
                return {...state, inProgress: true};
            }
            return state;
        case UPDATE_FIELD_AUTH:
            return {...state, [action.key]: action.value};
        default:
            return state;
    }
};
