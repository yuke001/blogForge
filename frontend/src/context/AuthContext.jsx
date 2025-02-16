// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, logoutUser } from "../services/authService";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const profile = await getUserProfile(token);
                setUser(profile);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setUser(null);
                localStorage.removeItem("token"); //Clear token if profile fetch fails.
                toast.error("Failed to fetch user profile. Please login again."); // Show error message
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        setUser(userData);
    };

    const logout = async () => {
        const token = localStorage.getItem("token");

        try {
            if (token) {
                await logoutUser(token); // Call the service to logout on the backend
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again."); //Show error message
            // Optionally handle the error (e.g., show a message to the user)
        } finally {
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}