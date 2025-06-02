import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { showFieldReducer } from "./showFieldReducer";
import { authReducer } from "./authReducer";
import { pickUpDropOffActions } from "./pickUpDropOffActions/index";

const reducer = combineReducers({

  showFieldReducer,
  authReducer,
  pickUpDropOffActions
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  // rootReducer,
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
