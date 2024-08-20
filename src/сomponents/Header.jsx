import React, {useEffect, useState, useRef, useContext} from "react";
import "../index.css";
import {ReactComponent as IateLogo} from "../assets/iateLogo.svg";
import {ReactComponent as AuthIcon} from "../assets/user.svg";
import {ReactComponent as NotificationsIcon} from "../assets/notification.svg";
import {useNavigate} from 'react-router-dom';
import LoginPopup from "./LoginPopup";
import NotificationsPopup from "./NotificationsPopup";
import {useWindowWidth} from "../common";
import PopupsContext from "../context/PopupsContext";

const Header = ({groupName, groupId}) => {
    const windowWidth = useWindowWidth();
    const authPopupRef = useRef(null);
    const authButtonRef = useRef(null);
    const notificationsPopupRef = useRef(null);
    const notificationsButtonRef = useRef(null);
    const navigate = useNavigate();
    const {
        isNotificationPopupOpen,
        setIsNotificationPopupOpen,
        isUserPopupOpen,
        setIsUserPopupOpen
    } = useContext(PopupsContext);


    const handleLogoClick = (e) => {
        e.stopPropagation();
        navigate("/");
    };

    const handleAuthClick = (e) => {
        e.stopPropagation();
        setIsUserPopupOpen(!isUserPopupOpen);
        if (!isUserPopupOpen) {
            setIsNotificationPopupOpen(false); // Закрыть уведомления, если открыты
        }
    };

    const handleNotificationClick = (e) => {
        e.stopPropagation();
        setIsNotificationPopupOpen(!isNotificationPopupOpen);
        if (!isNotificationPopupOpen) {
            setIsUserPopupOpen(false); // Закрыть авторизацию, если открыта
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (authPopupRef.current && !authPopupRef.current.contains(event.target)
                && authButtonRef.current && !authButtonRef.current.contains(event.target)) {
                setIsUserPopupOpen(false);
            }

            if (notificationsPopupRef.current && !notificationsPopupRef.current.contains(event.target)
                && notificationsButtonRef.current && !notificationsButtonRef.current.contains(event.target)) {
                setIsNotificationPopupOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationPopupOpen,isUserPopupOpen, setIsNotificationPopupOpen, setIsUserPopupOpen]);

    return (
        <header className="header-container">
            <div className="header-content-container">
                <div className="logo-container" onClick={handleLogoClick}>
                    <IateLogo style={windowWidth <= 930 ? {width: "30px", height: "30px"} :
                        {width: "70px", height: "70px"}}/>
                    <div className="schedule-header-text">
                        Расписание занятий
                    </div>
                </div>

                <div style={{display: "flex", height: "auto"}}>
                    <button ref={notificationsButtonRef}
                            className={isNotificationPopupOpen ? "button-click-accent active" : "button-click-accent"}
                            onClick={handleNotificationClick}
                            style={windowWidth <= 930 ? {padding: "2px"} :
                                {padding: "8px"}}>
                        <NotificationsIcon
                            style={windowWidth <= 930 ? {width: "18px", height: "18px"} :
                                {width: "35px", height: "35px"}}/>
                    </button>
                    {isNotificationPopupOpen &&
                        <NotificationsPopup ref={notificationsPopupRef} groupName={groupName} groupId={groupId}/>}

                    <div style={windowWidth <= 930 ? {paddingRight: "14px"} : {paddingRight: "40px"}}/>

                    <button ref={authButtonRef}
                            className={isUserPopupOpen ? "button-click-accent active" : "button-click-accent"}
                            onClick={handleAuthClick}
                            style={windowWidth <= 930 ? {padding: "2px"} :
                                {padding: "8px"}}>
                        <AuthIcon
                            style={windowWidth <= 930 ? {width: "18px", height: "18px"} :
                                {width: "35px", height: "35px"}}/>
                    </button>
                    {isUserPopupOpen && <LoginPopup ref={authPopupRef}/>}
                </div>
            </div>
        </header>
    )
        ;
};

export default Header;
