import React, {useCallback, useContext, useEffect, useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import Context from "../Context";
import {useNavigate, useLocation} from 'react-router-dom';

const WeekToggle = () => {
    const {setWeekType, weekType} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);
    const iconStyle = {
        animationName: "smooth-expanding",
        animationDuration: "0.1s"
    }
    const iconDecayStyle = {
        animationName: "smooth-shrinking",
        animationDuration: "0.1s"
    }

    const setWeekOdd = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('week', 'odd'); // Устанавливаем параметр 'week' равным 'odd'
        navigate(`?${searchParams.toString()}`);
        setWeekType("odd");
    }, [setWeekType, navigate, location.search]);

    const setWeekEven = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('week', 'even'); // Устанавливаем параметр 'week' равным 'odd'
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
        if (target.tagName.toLowerCase() === 'div') {
            if (
                target.className.includes("toggle-inner-inactive") ||
                target.className.includes("toggle-text-inactive")
            ) {
                setWeekOdd();
            }
        }
    };

    const deactivateClickHandler = (event) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'div') {
            if (
                target.className.includes("toggle-inner-inactive") ||
                target.className.includes("toggle-text-inactive")
            ) {
                setWeekEven()
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
                    <div className={weekType === "odd" ? "toggle-slider-toggled" : "toggle-slider-untoggled"}></div>
                </div>
                <div className={weekType === "odd" ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={deactivateClickHandler}>
                    <div style={{display: "flex"}}>
                        {weekType === "even" ?
                            <EvenWeekIcon style={iconStyle}/> : <div style={iconDecayStyle}></div>}
                        <div className={weekType === "odd"? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={deactivateClickHandler}>
                            Четная
                        </div>
                    </div>
                </div>

                <div className={weekType === "even" ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={activateClickHandler}>
                    <div style={{display: "flex"}}>
                        {weekType === "odd" ? <OddWeekIcon style={iconStyle}/> : <div style={iconDecayStyle}></div>}
                        <div className={weekType === "even" ? "toggle-text-inactive" : "toggle-text-active"}
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