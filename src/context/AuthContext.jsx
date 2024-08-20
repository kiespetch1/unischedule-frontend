import React, { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
    isUserSignedIn: false,
    editPermissions: false,
    setIsUserSignedIn: () => {},
    setEditPermissions: () => {},
    updateAuthorization: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [editPermissions, setEditPermissions] = useState(false);

    useEffect(() => {
        const authValue = Cookies.get("auth");
        const permissionValue = Cookies.get("permissions");

        setIsUserSignedIn(authValue === "true");
        setEditPermissions(permissionValue === "edit");
    }, []);

    const updateAuthorization = (isSignedIn, permissions) => {
        setIsUserSignedIn(isSignedIn);
        setEditPermissions(permissions === "edit");
    };

    return (
        <AuthContext.Provider value={{
            isUserSignedIn,
            editPermissions,
            setIsUserSignedIn,
            setEditPermissions,
            updateAuthorization,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
