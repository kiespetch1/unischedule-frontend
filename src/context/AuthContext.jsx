import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
    isUserSignedIn: false,
    editPermissions: false,
    allowedGroup: null,
    setIsUserSignedIn: () => {},
    setEditPermissions: () => {},
    setAllowedGroup: () => {},
    updateAuthorization: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [editPermissions, setEditPermissions] = useState(false);
    const [allowedGroup, setAllowedGroup] = useState(null);

    useEffect(() => {
        const authValue = Cookies.get("auth");
        const permissionValue = Cookies.get("permissions");
        const groupValue = Cookies.get("group");

        setIsUserSignedIn(authValue === "true");
        setEditPermissions(permissionValue === "edit");
        setAllowedGroup(groupValue || null);
    }, []);

    const updateAuthorization = (isSignedIn, permissions, group) => {
        setIsUserSignedIn(isSignedIn);
        setEditPermissions(permissions === "edit");
        setAllowedGroup(group);
    };

    return (
        <AuthContext.Provider value={{
            isUserSignedIn,
            editPermissions,
            allowedGroup,
            setIsUserSignedIn,
            setEditPermissions,
            setAllowedGroup,
            updateAuthorization,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
