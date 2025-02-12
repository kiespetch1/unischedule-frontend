import { useState, createContext } from "react";
import { getWeekNumber } from "../utility/DateHelpers";

const ScheduleContext = createContext({
    weekType: "even",
    subgroup: 1,
    setWeekType: () => {},
    setSubgroup: () => {},
});

export const ScheduleContextProvider = ({ children }) => {
    const isWeekEven = getWeekNumber % 2 !== 0;

    const [weekType, setWeekType] = useState(isWeekEven ? "even" : "odd");
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
