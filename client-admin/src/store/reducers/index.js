import { combineReducers } from "redux";

function baseUrl(state) {
    // return (state = "http://localhost:3000");
    return (state = "https://uniqlo-branch.foxhub.space");
}

function categoryReducer(state = "", action) {
    switch (action.type) {
        case "UPDATE_CATEGORY":
            return (state = action.payload);
        default:
            return state;
    }
}

function productReducer(state = "", action) {
    switch (action.type) {
        case "UPDATE_PRODUCT":
            return (state = action.payload);
        default:
            return state;
    }
}

export const combinedReducers = combineReducers({
    baseUrl,
    categoryReducer,
    productReducer
});
