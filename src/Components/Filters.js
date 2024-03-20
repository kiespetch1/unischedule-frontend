import WeekToggle from "./WeekToggle";
import SubgroupToggle from "./SubgroupToggle";
import React from "react";
import {ReactComponent as ChangeIcon} from "../assets/change.svg";


const Filters = () => {
    return (<div className="filters-container">
    <div className="group-container">
        <div className="group-filter-text">
            Группа
        </div>
        <div className="group-name">
            <div className="bold-group-text">
                ИВТ1-Б21
            </div>
            <a href="/blank" className="switch-icon" >
                <ChangeIcon/>
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