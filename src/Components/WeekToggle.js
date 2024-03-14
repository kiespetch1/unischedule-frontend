import React, {useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";


const WeekToggle = () => {

    const clickHandler = (event) => {
        const className = event.target.className;

        if (className.includes('toggle-inner-inactive') ||
            className.includes('toggle-text-inactive')) {
            setToggled(!toggled);
        }

    }
    const [toggled, setToggled] = useState(false)
    return (
        <div>
            <div className="filter-text">
                Неделя
            </div>
            <div className="toggle-outer">
                <div className={toggled ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={clickHandler}>
                    {!toggled ? (
                            <div style={{display: "flex"}}>
                                <EvenWeekIcon/> {/* можно переписать используя только эту часть через тернарный оператор*/}
                                <div className={toggled ? "toggle-text-inactive" : "toggle-text-active"}
                                     onClick={clickHandler}>
                                    Четная
                                </div>
                            </div>
                        ) :
                        (
                            <div style={{display: "flex"}}>
                                <div className={toggled ? "toggle-text-inactive" : "toggle-text-active"}
                                     onClick={clickHandler}>
                                    Четная
                                </div>
                            </div>
                        )}
                </div>

                <div className={!toggled ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={clickHandler}>
                    {toggled ? (
                            <div style={{display: "flex"}}>
                                <OddWeekIcon/>
                                <div className={!toggled ? "toggle-text-inactive" : "toggle-text-active"}
                                     onClick={clickHandler}>
                                    Нечетная
                                </div>
                            </div>
                        ) :
                        (
                            <div style={{display: "flex"}}>
                                <div className={!toggled ? "toggle-text-inactive" : "toggle-text-active"}
                                     onClick={clickHandler}>
                                    Нечетная
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};
export default WeekToggle;