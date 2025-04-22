import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { generalActions } from "./generalActions";
import { alertReducer } from "./alertReducer";


const reducer = combineReducers({ generalActions, alertReducer });
const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

export default store;
