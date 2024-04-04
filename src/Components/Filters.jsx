import WeekToggle from "./WeekToggle";
import SubgroupToggle from "./SubgroupToggle";
import React, {useEffect, useState} from "react";
import {ReactComponent as ChangeIcon} from "../assets/change.svg";
import {ReactComponent as ChangeIconSmall} from "../assets/changeSmall.svg";


const Filters = () => {
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

    return (<div className="filters-container">
        <div className="group-container">
            <div className="group-filter-text">
                Группа
            </div>
            <div className="group-name">
                <div className="bold-group-text">
                    ИВТ1-Б21
                </div>
                <a href="/groups" className="switch-icon">
                    {windowWidth <= 930 ? <ChangeIconSmall/> : <ChangeIcon/>}
                </a>

            </div>
        </div>
        <div className="week-type-container">
            <WeekToggle/>
        </div>

        <div className="subgroup-container">
            <SubgroupToggle/>
        </div>
    </div>);
};
export default Filters;