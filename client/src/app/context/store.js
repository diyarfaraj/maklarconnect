'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import Cookies from 'js-cookie';

// Define the context with a default shape
const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if token is stored in cookies on initial load
        console.log("Checking if user is logged in");
        const token = Cookies.get('auth-token');

        console.log("Token found: ", token);

        if (token) {
            setIsLoggedIn(true);
            console.log("User is logged in");
        }
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        // Additional login logic
        console.log("login function called");
    };

    const logout = () => {
        setIsLoggedIn(false);
        // Additional logout logic
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};
