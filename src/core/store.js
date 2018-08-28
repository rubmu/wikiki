// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'

import rootReducer from 'reducers/rootReducer'

const middleware = [
    reduxThunk,
];
const devTool = window.devToolsExtension ? window.devToolsExtension() : (f) => f

const enhance = compose(
    applyMiddleware(...middleware),
    devTool
);

const initialState = {}

const store: Object = createStore(rootReducer, initialState, enhance)
export default store
