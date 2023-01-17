function setCategory(payload) {
    return {
        type: "UPDATE_CATEGORY",
        payload,
    };
}

export function getCategory(cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl } = getState();
            const response = await fetch(baseUrl + "/categories", {
                headers: { access_token: localStorage.access_token },
            });
            const result = await response.json();

            if (!response.ok) {
                throw result.message;
            }

            dispatch(setCategory(result));
        } catch (error) {
            cb(error);
        }
    };
}

export function addCategory(data, cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl, categoryReducer } = getState();
            const response = await fetch(baseUrl + "/categories", {
                method: "POST",
                headers: {
                    access_token: localStorage.access_token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!response.ok) {
                throw result.message;
            }

            dispatch(setCategory([result.data, ...categoryReducer]));
            cb(null, result.message);
        } catch (error) {
            cb(error);
        }
    };
}

export function updateCategory(id, data, cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl, categoryReducer } = getState();
            const response = await fetch(baseUrl + "/categories/" + id, {
                method: "PUT",
                headers: {
                    access_token: localStorage.access_token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!response.ok) {
                throw result.message;
            }

            const index = categoryReducer.map((el) => +el.id).indexOf(+id);

            if (index !== -1) {
                for (const key in result.data) {
                    categoryReducer[index][key] = result.data[key];
                }
            }

            dispatch(setCategory(categoryReducer));
            cb(null, result.message);
        } catch (error) {
            cb(error);
        }
    };
}

export function deleteCategory(id, cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl, categoryReducer } = getState();
            const response = await fetch(baseUrl + "/categories/" + id, {
                method: "DELETE",
                headers: { access_token: localStorage.access_token },
            });
            const result = await response.json();

            if (!response.ok) {
                throw result.message;
            }

            dispatch(setCategory(categoryReducer.filter((el) => el.id !== id)));
            cb(null, result.message);
        } catch (error) {
            cb(error);
        }
    };
}
