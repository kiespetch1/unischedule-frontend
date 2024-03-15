import React, {useContext, useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import Context from "../Context";

const WeekToggle = () => {
    const {setWeekType} = useContext(Context);
    const [toggled, setToggled] = useState(false);
    const iconStyle = {
        animationName: "smooth-expanding",
        animationDuration: "0.1s"
    }
    const iconDecayStyle = {
        animationName: "smooth-shrinking",
        animationDuration: "0.1s"
    }

    const activateClickHandler = (event) => {
        const className = event.target.className;
        if (
            className.includes("toggle-inner-inactive") ||
            className.includes("toggle-text-inactive")
        ) {
            setToggled(!toggled);
            setWeekType({weekType: 1});
        }
    };

    const deactivateClickHandler = (event) => {
        const className = event.target.className;

        if (
            className.includes("toggle-inner-inactive") ||
            className.includes("toggle-text-inactive")
        ) {
            setToggled(!toggled);
            setWeekType({weekType: 2});
        }
    };
    return (
        <div>
            <div className="filter-text">
                Неделя
            </div>
            <div className="toggle-outer">
                <div className="toggle-slider-container">
                    <div className={toggled ? "toggle-slider-toggled2" : "toggle-slider-untoggled2"}></div>
                </div>
                <div className={toggled ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={deactivateClickHandler}>
                    <div style={{display: "flex"}}>
                        {!toggled ?
                            <EvenWeekIcon style={iconStyle}/> : <div style={iconDecayStyle}></div>}
                        <div className={toggled ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={deactivateClickHandler}>
                            Четная
                        </div>
                    </div>
                </div>

                <div className={!toggled ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={activateClickHandler}>
                    <div style={{display: "flex"}}>
                        {toggled ? <OddWeekIcon style={iconStyle}/> : <div style={iconDecayStyle}></div>}
                        <div className={!toggled ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={activateClickHandler}>
                            Нечетная
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WeekToggle;