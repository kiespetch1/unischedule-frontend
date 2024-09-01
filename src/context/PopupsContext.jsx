import { useState, createContext } from "react";

const PopupsContext = createContext({
    isNotificationPopupOpen: false,
    setIsNotificationPopupOpen: () => {},
    isUserPopupOpen: false,
    setIsUserPopupOpen: () => {},
});

export const PopupsContextProvider = ({ children }) => {
    const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
    const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

    return (
        <PopupsContext.Provider value={{
            isNotificationPopupOpen,
            setIsNotificationPopupOpen,
            isUserPopupOpen,
            setIsUserPopupOpen
        }}>
            {children}
        </PopupsContext.Provider>
    );
};

export default PopupsContext;
