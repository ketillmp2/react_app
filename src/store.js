import { applyMiddleware, createStore, combineReducers } from 'redux';
import {authMiddleware, pointsMiddleware, promiseMiddleware} from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import points from './reducers/points';


const reducers = combineReducers({
    auth,
    common,
    points
});

const middleware = applyMiddleware(promiseMiddleware, authMiddleware, pointsMiddleware);

const store = createStore(reducers, middleware);

export default store;
