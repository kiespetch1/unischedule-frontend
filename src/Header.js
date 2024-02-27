import React from "react";
import "./index.css";
import OddWeekButton from "./OddWeekButton";
import EvenWeekButton from "./EvenWeekButton";
import FirstGroupButton from "./FirstSubgroupButton"
import SecondGroupButton from "./SecondSubgroupButton"
import LoginButton from "./LoginButton"

const Header = () => {
    return (
        <div className="header-rect">
            <div className="header60">
                <div className="logoBlock">
                    <h1 className="logoText">Расписание группы</h1>
                    <h1 className="groupText">ИВТ1-Б21</h1>
                </div>
                <div className="headerDivider"></div>
                <h2 className="filterText">Фильтровать по:</h2>
                <div className="buttonsBlock">

                    <div className="weekButtons">
                        <OddWeekButton label="Четная неделя"/>
                        <EvenWeekButton label="Нечетная неделя"/>
                    </div>
                    <div className="weekButtons">
                        <FirstGroupButton label="1 подгруппа"/>
                        <SecondGroupButton label="2 подгруппа"/>
                    </div>
                </div>
            </div>
            <LoginButton label="Войти"/>
        </div>

    );
};

export default Header;
