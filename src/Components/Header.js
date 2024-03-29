import React, {useEffect, useState} from "react";
import "../index.css";
import {ReactComponent as IateLogo} from "../assets/iateLogo.svg";
import {ReactComponent as IateLogoSmall} from "../assets/iateLogoSmall.svg";
import {ReactComponent as SettingsIcon} from "../assets/settings.svg";
import {ReactComponent as SettingsIconSmall} from "../assets/settingsSmall.svg";
import {ReactComponent as AuthIcon} from "../assets/auth.svg";
import {ReactComponent as AuthIconSmall} from "../assets/authSmall.svg";
import Filters from "./Filters";


const Header = () => {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

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
        <div className="width">
            <header className="header-container">
                <div className="logo-container">
                    {windowWidth <= 930 ? <IateLogoSmall/> : <IateLogo/> }

                    <div className="schedule-header-text">
                        Расписание занятий
                    </div>
                </div>

                <div style={{display: "flex", height: "auto"}}>
                    {windowWidth <= 930 ? <SettingsIconSmall style={{paddingRight: "14px"}}/> : <SettingsIcon style={{paddingRight: "40px"}}/>}
                    {windowWidth <= 930 ? <AuthIconSmall/> : <AuthIcon/>}
                </div>
            </header>
            <Filters/>
        </div>
    );

}
export default Header;