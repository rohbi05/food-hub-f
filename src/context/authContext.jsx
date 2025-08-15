import { useState, useEffect, createContext, useContext } from "react";
import Authservice from "../api/services/auth.jsx";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
        setUser(user);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await Authservice.login(username, password);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const signup = async (username, email, password, role) => {
        try{
            const response = await Authservice.register(username, email, password,role);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            return response;
        } catch (error){
            console.error('Registration failed');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await Authservice.logout();
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    };
    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);