import React, { useState, createContext } from "react";

const ScheduleContext = createContext({
    weekType: "even",
    subgroup: 1,
    setWeekType: () => {},
    setSubgroup: () => {},
});

export const ScheduleContextProvider = ({ children }) => {
    const [weekType, setWeekType] = useState(null);
    const [subgroup, setSubgroup] = useState(null);

    const updateWeekType = (newWeekType) => {
        setWeekType(newWeekType);
    };

    const updateSubgroup = (newSubgroup) => {
        setSubgroup(newSubgroup);
    };

    return (
        <ScheduleContext.Provider value={{
            weekType,
            subgroup,
            setWeekType: updateWeekType,
            setSubgroup: updateSubgroup,
        }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export default ScheduleContext;
