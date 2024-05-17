import React, {useEffect, useState} from "react";
import "../index.css";
import {ReactComponent as IateLogo} from "../assets/iateLogo.svg";
import {ReactComponent as AuthIcon} from "../assets/user.svg";
import {ReactComponent as NotificationsIcon} from "../assets/notification.svg";
import {useNavigate} from 'react-router-dom';


const Header = () => {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const navigate = useNavigate();

    const handleLogoClick = (e) => {
        e.stopPropagation();
        navigate("/groups");
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

    return (
        <header className="header-container" >
            <div className="header-content-container">
                <div className="logo-container" onClick={handleLogoClick}>
                    <IateLogo style={windowWidth <= 930 ? {width: "30px", height: "30px"} :
                        {width: "69px", height: "69px"}}/>
                    <div className="schedule-header-text">
                        Расписание занятий
                    </div>
                </div>

                <div style={{display: "flex", height: "auto"}}>
                    <NotificationsIcon
                        style={windowWidth <= 930 ? {width: "18px", height: "18px", paddingRight: "16px"} :
                            {width: "35px", height: "35px", paddingRight: "40px"}}/>
                    <AuthIcon style={windowWidth <= 930 ? {width: "18px", height: "18px"} :
                        {width: "35px", height: "35px"}}/>
                </div>
            </div>

        </header>
    );
}
export default Header;