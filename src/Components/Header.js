import React from "react";
import "../index.css";
import {ReactComponent as IateLogo} from "../assets/iateLogo.svg";
import {ReactComponent as SettingsIcon} from "../assets/settings.svg";
import {ReactComponent as AuthIcon} from "../assets/auth.svg";
import {ReactComponent as ChangeIcon} from "../assets/change.svg";
import WeekToggle from "./WeekToggle";
import SubgroupToggle from "./SubgroupToggle";

const Header = () => {
    return (
        <div className="width">
            <header className="header-container">
                <div className="logo-container">
                    <IateLogo/>
                    <div className="header-text">
                        Расписание занятий
                    </div>
                </div>

                <div>
                    <SettingsIcon style={{paddingRight: "40px"}}/>
                    <AuthIcon/>
                </div>
            </header>
            <div className="filters-container">
                <div className="group-container">
                    <div className="group-filter-text">
                        Группа
                    </div>
                    <div className="group-name">
                        <div className="bold-group-text">
                            ИВТ1-Б21
                        </div>
                        <a href="/blank" style={{width: "29px", height: "29px"}}>
                            <ChangeIcon/>
                        </a>
                    </div>
                </div>
                <div className="week-type-container">
                    <WeekToggle />
                </div>

                <div className="subgroup-container">
                    <SubgroupToggle />
                </div>
            </div>
        </div>
    );

}
export default Header;