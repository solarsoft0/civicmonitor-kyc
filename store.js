import {
    createStore, combineReducers,
 applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from "./redux/reducers/rootReducer"




export function initializeStore() {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}



//use when going offline first

// import compareReducers, { initialState as compareInitialState } from './redux/reducers/CompareReducer'
// //initial state can be populate stuff from the server or local-storage but in this case, i'm using the initial state of compare reducer to fill in

// export function initializeStore(initialState = {...compareInitialState}) {
//     return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
// }