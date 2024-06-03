import React, {useEffect, useState, useRef} from "react";
import "../index.css";
import {ReactComponent as IateLogo} from "../assets/iateLogo.svg";
import {ReactComponent as AuthIcon} from "../assets/user.svg";
import {ReactComponent as NotificationsIcon} from "../assets/notification.svg";
import {useNavigate} from 'react-router-dom';
import LoginPopup from "./LoginPopup";

const Header = () => {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
    const [isNotificationsPopupOpen, setIsNotificationsPopupOpen] = useState(false);
    const authPopupRef = useRef(null);
    const authButtonRef = useRef(null);
    const notificationsPopupRef = useRef(null);
    const notificationsButtonRef = useRef(null);
    const navigate = useNavigate();

    const handleLogoClick = (e) => {
        e.stopPropagation();
        navigate("/");
    }

    const handleAuthClick = (e) => {
        e.stopPropagation();
        setIsAuthPopupOpen(!isAuthPopupOpen);
    }
    const handleNotificationClick = (e) => {
        e.stopPropagation();
        setIsNotificationsPopupOpen(!isNotificationsPopupOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => { //для закрытия окна по клику вне его зоны
        const handleClickOutside = (event) => {
            if (authPopupRef.current && !authPopupRef.current.contains(event.target)
                && authButtonRef.current && !authButtonRef.current.contains(event.target)) {
                setIsAuthPopupOpen(false);
            }
        };

        if (isAuthPopupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAuthPopupOpen]);

    useEffect(() => { //для закрытия окна по клику вне его зоны
        const handleClickOutside = (event) => {
            if (notificationsPopupRef.current && !notificationsPopupRef.current.contains(event.target)
                && notificationsButtonRef.current &&!notificationsButtonRef.current.contains(event.target)) {
                setIsNotificationsPopupOpen(false);
            }
        };

        if (isNotificationsPopupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationsPopupOpen]);

    return (
        <header className="header-container">
            <div className="header-content-container">
                <div className="logo-container" onClick={handleLogoClick}>
                    <IateLogo style={windowWidth <= 930 ? {width: "30px", height: "30px"} :
                        {width: "69px", height: "69px"}}/>
                    <div className="schedule-header-text">
                        Расписание занятий
                    </div>
                </div>

                <div style={{display: "flex", height: "auto"}}>
                    <button ref={notificationsButtonRef}
                        className={isNotificationsPopupOpen ? "button-click-accent active" : "button-click-accent"}
                            onClick={handleNotificationClick}>
                        <NotificationsIcon
                            style={windowWidth <= 930 ? {width: "18px", height: "18px", paddingRight: "16px"} :
                                {width: "35px", height: "35px"}}/>
                    </button>

                    <div style={{paddingRight: "40px"}}/>

                    <button ref={authButtonRef}
                            className={isAuthPopupOpen ? "button-click-accent active" : "button-click-accent"}
                            onClick={handleAuthClick}>
                        <AuthIcon
                            style={windowWidth <= 930 ? {width: "18px", height: "18px"} :
                                {width: "35px", height: "35px"}}/>
                    </button>
                    {isAuthPopupOpen && <LoginPopup ref={authPopupRef}/>}
                </div>
            </div>
        </header>
    );
}

export default Header;
