import React from "react";
import "../index.css";
import {ReactComponent as IateLogo} from "../assets/iateLogo.svg";
import {ReactComponent as SettingsIcon} from "../assets/settings.svg";
import {ReactComponent as AuthIcon} from "../assets/auth.svg";
import Filters from "./Filters";


const Header = () => {
    return (
        <div className="width">
            <header className="header-container">
                <div className="logo-container">
                    <IateLogo/>
                    <div className="schedule-header-text">
                        Расписание занятий
                    </div>
                </div>

                <div>
                    <SettingsIcon style={{paddingRight: "40px"}}/>
                    <AuthIcon/>
                </div>
            </header>
            <Filters/>
        </div>
    );

}
export default Header;