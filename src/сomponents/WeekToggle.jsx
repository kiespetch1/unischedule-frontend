import React, {useCallback, useContext, useEffect, useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import ScheduleContext from "../context/ScheduleContext";
import {useNavigate, useLocation} from 'react-router-dom';
import {useWindowWidth} from "../common";

const WeekToggle = () => {
    const {setWeekType, weekType} = useContext(ScheduleContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);
    const windowWidth = useWindowWidth();

    const iconAnimation = {
        animationName: "smooth-expanding-20px",
        animationDuration: "0.1s",
        width: "21px",
        height: "21px"
    }
    const iconDecayAnimation = {
        animationName: "smooth-shrinking-20px",
        animationDuration: "0.1s"
    }

    const iconSmallAnimation = {
        animationName: "smooth-expanding-10px",
        animationDuration: "0.1s",
        width: "10px",
        height: "10px"
    }
    const iconDecaySmallAnimation = {
        animationName: "smooth-shrinking-10px",
        animationDuration: "0.1s"
    }

    const setWeekOdd = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('week', 'odd');
        navigate(`?${searchParams.toString()}`);
        setWeekType("odd");
    }, [setWeekType, navigate, location.search]);

    const setWeekEven = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('week', 'even');
        navigate(`?${searchParams.toString()}`);
        setWeekType("even");
    }, [setWeekType, navigate, location.search]);

    useEffect(() => {
        if (!initialized) {
            const searchParams = new URLSearchParams(location.search);
            const weekType = searchParams.get('week');
            if (weekType === "odd") {
                setWeekOdd();
            } else if (weekType === "even") {
                setWeekEven();
            }
            setInitialized(true);
        }
    }, [initialized, location, setWeekOdd, setWeekEven]);

    const activateClickHandler = (event) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'div' || target.tagName.toLowerCase() === 'button') {
            if (
                target.className.includes("toggle-inner-inactive") ||
                target.className.includes("toggle-text-inactive")
            ) {
                setWeekEven();
            }
        }
    };

    const deactivateClickHandler = (event) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'div' || target.tagName.toLowerCase() === 'button') {
            if (
                target.className.includes("toggle-inner-inactive") ||
                target.className.includes("toggle-text-inactive")
            ) {
                setWeekOdd()
            }
        }
    };

    return (
        <div>
            <div className="filter-text">
                Неделя
            </div>
            <div className="toggle-outer">
                <div className="toggle-slider-container">
                    <div className={weekType === "even" ? "toggle-slider-toggled" : "toggle-slider-untoggled"}></div>
                </div>

                <button className={weekType === "even" ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={deactivateClickHandler}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", zIndex: "2"}}>
                        {weekType === "odd" ?
                            (windowWidth <= 930 ? <OddWeekIcon style={iconSmallAnimation}/> :
                                <OddWeekIcon style={iconAnimation}/>) : (windowWidth <= 930 ?
                                <div style={iconDecaySmallAnimation}></div> : <div style={iconDecayAnimation}></div>)
                        }
                        <div className={weekType === "even" ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={deactivateClickHandler} style={{display: "flex", alignItems: "center", zIndex: "2"}}>
                            Нечетная
                        </div>
                    </div>
                </button>

                {windowWidth <= 930 ? <div style={{width: "4px"}}></div> : null}

                <button className={weekType === "odd" ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={activateClickHandler}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", zIndex: "2"}}>
                        {weekType === "even" ?
                            (windowWidth <= 930 ? <EvenWeekIcon style={iconSmallAnimation}/> :
                                <EvenWeekIcon style={iconAnimation}/>) : (windowWidth <= 930 ?
                                <div style={iconDecaySmallAnimation}></div> : <div style={iconDecayAnimation}></div>)
                        }
                        <div className={weekType === "odd" ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={activateClickHandler} style={{display: "flex", alignItems: "center"}}>
                            Четная
                        </div>
                    </div>
                </button>

            </div>
        </div>
    );
};
export default WeekToggle;