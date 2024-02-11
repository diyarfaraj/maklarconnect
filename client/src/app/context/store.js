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
        console.log("Store.js: Checking if user is logged in");
        const token = Cookies.get('mc_auth-token');

        console.log("Store.js: Token found: ", token);

        if (token) {
            setIsLoggedIn(true);
            console.log("Store.js: User is logged in");
            console.log("Store.js: isLoggedIn: ", isLoggedIn);
        }
    }, []);

    const login = (token) => {
        Cookies.set('mc_auth-token', token, { expires: 7 });
        setIsLoggedIn(true);
        // Additional login logic
        console.log("Store.js: login function called");
        console.log("Store.js: isLoggedIn: ", isLoggedIn);

    };

    const logout = () => {
        Cookies.remove('mc_auth-token');
        setIsLoggedIn(false);
        // Additional logout logic
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};
