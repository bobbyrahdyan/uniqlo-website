const setProduct = (payload) => ({
    type: "UPDATE_PRODUCT",
    payload,
});

export const getAllProduct = (cb) => async (dispatch, getState) => {
    try {
        const { baseUrl } = getState();
        const response = await fetch(baseUrl + "/pub");
        const result = await response.json();

        if (!response.ok) {
            throw result.message;
        }

        dispatch(setProduct(result));
        cb(null, result.message);
    } catch (error) {
        cb(error);
    }
};

export const getDetailroduct = (slug, cb) => async (dispatch, getState) => {
    try {
        const { baseUrl } = getState();
        const response = await fetch(baseUrl + "/pub/" + slug);
        const result = await response.json();
        if (!response.ok) {
            throw result.message;
        }

        dispatch(setProduct(result));
        cb(null, result.message);
    } catch (error) {
        cb(error);
    }
};
