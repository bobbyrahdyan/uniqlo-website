function setProduct(payload) {
    return {
      type: "UPDATE_PRODUCT",
      payload,
    };
}

export function getProduct(cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl } = getState();
            const response = await fetch(baseUrl + "/products", {
                headers: { access_token: localStorage.access_token },
            });
            const result = await response.json();

            if (!response.ok) {
                throw result.message;
            }

            dispatch(setProduct(result));
        } catch (error) {
            cb(error);
        }
    };
}

export function addProduct({ product, images }, cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl, productReducer } = getState();
            const response = await fetch(baseUrl + "/products", {
                method: "POST",
                headers: {
                    access_token: localStorage.access_token,
                    "Content-Type": "application/json" },
                body: JSON.stringify({ product, images }),
            });
            const result = await response.json();

            if (!response.ok) {
                throw result.message;
            }

            dispatch(setProduct([result.data, ...productReducer]));
            cb(null, result.message);
        } catch (error) {
            cb(error);
        }
    };
}

export function updateProduct(id, { product, images }, cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl, productReducer } = getState();
            const response = await fetch(baseUrl + "/products/" + id, {
                method: "PUT",
                headers: {
                    access_token: localStorage.access_token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ product, images }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw result.message;
            }

            const index = productReducer.map((el) => +el.id).indexOf(+id);

            if (index !== -1) {
                for (const key in result.data) {
                    productReducer[index][key] = result.data[key];
                }
            }

            dispatch(setProduct(productReducer));
            cb(null, result.message);
        } catch (error) {
            cb(error);
        }
    };
}

export function deleteProduct(id, cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl, productReducer } = getState();
            const response = await fetch(baseUrl + "/products/" + id, {
                method: "DELETE",
                headers: { access_token: localStorage.access_token },
            });
            const result = await response.json();
            if (!response.ok) {
                throw result.message;
            }

            dispatch(setProduct(productReducer.filter((el) => el.id !== id)));
            cb(null, result.message);
        } catch (error) {
            cb(error);
        }
    };
}
