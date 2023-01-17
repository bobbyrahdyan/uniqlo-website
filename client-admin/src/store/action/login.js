export function register(obj, cb) {
    return async (dispatch, getState) => {
        try {
            const access_token = localStorage.access_token;
            const { baseUrl } = getState();

            const response = await fetch(baseUrl + "/register", {
                headers: {
                    "Content-Type": "application/json",
                    access_token
                },
                method: "POST",
                body: JSON.stringify(obj),
            });

            const result = await response.json();

            if (!response.ok) {
                throw result.message;
            }

            cb(null, result.message);
        } catch (error) {
            cb(error);
        }
    }
}

export function login(obj, cb) {
    return async (dispatch, getState) => {
        try {
            const { baseUrl } = getState();

            const response = await fetch(baseUrl + "/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(obj),
            });

            const result = await response.json();

            if (!response.ok) {
                throw result.message;
            }

            localStorage.setItem("access_token", result.access_token);

            cb();
        } catch (error) {
            cb(error);
        }
    }
}
