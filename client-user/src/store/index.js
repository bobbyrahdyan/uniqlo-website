import { legacy_createStore as createStore, applyMiddleware, combineReducers, } from "redux";
import { baseUrl, productReducer } from "./reducers";
import thunk from "redux-thunk";

const combined = combineReducers({ baseUrl, productReducer });
const store = createStore(combined, applyMiddleware(thunk));

export default store;
