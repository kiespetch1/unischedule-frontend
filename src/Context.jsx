import React, { useState, createContext, useEffect } from "react";
import Cookies from 'js-cookie';

const Context = createContext({
    weekType: "even",
    subgroup: 1,
    setSubgroup: () => {},
    setWeekType: () => {},
    isUserSignedIn: false,
    editPermissions: false,
    setIsUserSignedIn: () => {},
    setEditPermissions: () => {}
});

export const ContextProvider = ({ children }) => {
    const [weekType, setWeekType] = useState(null);
    const [subgroup, setSubgroup] = useState(null);
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [editPermissions, setEditPermissions] = useState(false);

    useEffect(() => {
        const authValue = Cookies.get("auth");
        const permissionValue = Cookies.get("permissions");

        setIsUserSignedIn(authValue === "true");
        setEditPermissions(permissionValue === "edit");
    }, []);

    const updateWeekType = (newWeekType) => {
        setWeekType(newWeekType);
    };

    const updateSubgroup = (newSubgroup) => {
        setSubgroup(newSubgroup);
    };

    const updateAuthorization = (isSignedIn, permissions) => {
        setIsUserSignedIn(isSignedIn);
        setEditPermissions(permissions === "edit");
    };

    return (
        <Context.Provider value={{
            weekType,
            subgroup,
            setWeekType: updateWeekType,
            setSubgroup: updateSubgroup,
            isUserSignedIn,
            editPermissions,
            setIsUserSignedIn,
            setEditPermissions,
            updateAuthorization
        }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
