import React, {useState} from "react";
import "../index.css";
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg"


const SubgroupToggle = () => {

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
                Подгруппа
            </div>
            <div className="toggle-outer">
                <div className={toggled ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={clickHandler}>
                    {!toggled ? (
                            <div style={{display: "flex"}}>
                                <FirstSG/>
                                <div className={toggled ? "toggle-text-inactive" : "toggle-text-active"}
                                     onClick={clickHandler}>
                                    Первая
                                </div>
                            </div>
                        ) :
                        (
                            <div style={{display: "flex"}}>
                                <div className={toggled ? "toggle-text-inactive" : "toggle-text-active"}
                                     onClick={clickHandler}>
                                    Первая
                                </div>
                            </div>
                        )}
                </div>

                <div className={!toggled ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={clickHandler}>
                    {toggled ? (
                            <div style={{display: "flex"}}>
                                <SecondSG/>
                                <div className={!toggled ? "toggle-text-inactive" : "toggle-text-active"}
                                     onClick={clickHandler}>
                                    Вторая
                                </div>
                            </div>
                        ) :
                        (
                            <div style={{display: "flex"}}>
                                <div className={!toggled ? "toggle-text-inactive" : "toggle-text-active"}
                                     onClick={clickHandler}>
                                    Вторая
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};
export default SubgroupToggle;