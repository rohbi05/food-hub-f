import axios from "axios";
import api from '../axios'

const Authservice = {
    async register (username, email, password,role){
        try {
            const response = await api.post("/signup", {
                username,
                email,
                password,
                role
            });
            return response.data;
            } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    },
    async login (username, password) {
        try {
            const response = await api.post("/signin", {
                username,
                password
            });
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },
    async logout () {
        try {
            const response = await api.post("/logout");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return response.data;
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    },
    async passwordReset (email) {
        try {
            const response = await api.post("/password-reset/", {
                email
            });
            return response.data;
        } catch (error) {
            console.error("Password reset failed:", error);
            throw error;
        }
    },
    async passwordChange (uid, token, newPassword, confirmPassword) {
        try {
            const response = await api.post("/password-reset-confirm/<uidb64>/<token>/", {
                uid,
                token,
                newPassword,
                confirmPassword
            });
            return response.data;
        } catch (error) {
            console.error("Password change failed:", error);
            throw error;
        }
    },
}

export default Authservice;