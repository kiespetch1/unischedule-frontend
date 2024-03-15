import React, { useState, createContext } from "react";

const Context = createContext({
    weekType: "even",
    subgroup: 1,
    setSubgroup: () => {},
    setWeekType: () => {},
});

export const ContextProvider = ({ children }) => {
    const [weekType, setWeekType] = useState("even");
    const [subgroup, setSubgroup] = useState(1);

    const updateWeekType = (newWeekType) => {
        setWeekType(newWeekType);
    };

    const updateSubgroup = (newSubgroup) => {
        setSubgroup(newSubgroup);
    };

    return (
        <Context.Provider value={{ weekType, subgroup, setWeekType: updateWeekType, setSubgroup: updateSubgroup }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
