import  axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 15000,
});

// getAccessToken = () => {
//     // Logic to retrieve access token, e.g., from local storage or a cookie
//     return localStorage.getItem("accessToken");
// };
// getRefreshToken = () => {
//     // Logic to retrieve refresh token, e.g., from local storage or a cookie
//     return localStorage.getItem("refreshToken");
// }

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}
);

api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    

    // Check if the error is due to an expired token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
    
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            try {
                const response = await axios.post("http://localhost:8000/api/token/refresh/", { token: refreshToken });
                const newAccessToken = response.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                // Redirect to login and clear access token
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        } else {
            console.error("No refresh token available");
            //Redirect to login and clear access token
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
}
);


export default api;