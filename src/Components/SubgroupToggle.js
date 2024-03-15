import React, {useContext, useState} from "react";
import "../index.css";
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg"
import Context from "../Context";


const SubgroupToggle = () => {
    const {setSubgroup} = useContext(Context);
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
        const target = event.target;
        if (target.tagName.toLowerCase() === 'div'){
            if (
                target.className.includes("toggle-inner-inactive") ||
                target.className.includes("toggle-text-inactive")
            ) {
                setToggled(!toggled);
                setSubgroup(1);
            }
        }
    };

    const deactivateClickHandler = (event) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'div'){
            if (
                target.className.includes("toggle-inner-inactive") ||
                target.className.includes("toggle-text-inactive")
            ) {
                setToggled(!toggled);
                setSubgroup(2);
            }
        }
    };

    return (
        <div>
            <div className="filter-text">
                Подгруппа
            </div>
            <div className="toggle-outer">
                <div className="toggle-slider-container">
                    <div className={toggled ? "toggle-slider-toggled" : "toggle-slider-untoggled"}></div>
                </div>
                <div className={toggled ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={deactivateClickHandler}>
                    <div style={{display: "flex"}}>
                        {!toggled ?
                            <FirstSG style={iconStyle}/> : <div style={iconDecayStyle}></div>}
                        <div className={toggled ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={deactivateClickHandler}>
                            Первая
                        </div>
                    </div>
                </div>

                <div className={!toggled ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={activateClickHandler}>
                    <div style={{display: "flex"}}>
                        {toggled ? <SecondSG style={iconStyle}/> : <div style={iconDecayStyle}></div>}
                        <div className={!toggled ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={activateClickHandler}>
                            Вторая
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SubgroupToggle;

