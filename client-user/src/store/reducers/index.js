export function baseUrl(state, action) {
    // return "http://localhost:3000";
    return "https://uniqlo-branch.foxhub.space";
}

export function productReducer(state = [], action) {
    switch (action.type) {
        case "UPDATE_PRODUCT":
            return action.payload;
        default:
            return state;
    }
}
