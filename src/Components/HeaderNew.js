import React from "react";
import "../index.css";
import {ReactComponent as IateLogo} from "../assets/iateLogo.svg";
import {ReactComponent as SettingsIcon} from "../assets/settings.svg";
import {ReactComponent as AuthIcon} from "../assets/auth.svg";
import {ReactComponent as ChangeIcon} from "../assets/change.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg";


const HeaderNew = () => {
    const settingsStyle = {
        paddingRight: "40px"
    };
    return (
        <div className="width">
            <header className="headerContainer">
                <div className="logoContainer">
                    <IateLogo/>
                    <div className="headerText">
                        Расписание занятий
                    </div>
                </div>

                <div>
                    <SettingsIcon style={settingsStyle}/>
                    <AuthIcon/>
                </div>
            </header>
            <div className="filtersContainer">
                <div className="groupContainer">
                    <div className="groupFilterText">
                        Группа
                    </div>
                    <div className="groupName">
                        <div className="boldGroupText">
                            ИВТ1-Б21
                        </div>
                        <ChangeIcon/>
                    </div>
                </div>
                <div className="weekTypeContainer">
                    <div className="filterText">
                        Неделя
                    </div>
                    <div className="toggleOuter">
                        <div className="toggleInner">
                            <div style={{display: "flex"}}><EvenWeekIcon/>
                                <div className="toggleActiveText">
                                    Четная
                                </div>
                            </div>

                        </div>

                        <div className="toggleInnerInactive">
                            <div className="toggleInactiveText">
                                Нечетная
                            </div>
                        </div>
                    </div>
                </div>

                <div className="subgroupContainer">
                    <div className="filterText">
                        Подгруппа
                    </div>
                    <div className="toggleOuter">
                        <div className="toggleInner">
                            <div style={{display: "flex"}}><FirstSG/>
                                <div className="toggleActiveText">
                                    Первая
                                </div>
                            </div>

                        </div>

                        <div className="toggleInnerInactive">
                            <div className="toggleInactiveText">
                                Вторая
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default HeaderNew;