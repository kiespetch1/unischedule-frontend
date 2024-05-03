import React, {useCallback, useContext, useEffect, useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as EvenWeekIconSmall} from "../assets/evenWeekSmall.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import {ReactComponent as OddWeekIconSmall} from "../assets/oddWeekSmall.svg";
import Context from "../Context";
import {useNavigate, useLocation} from 'react-router-dom';

const WeekToggle = () => {
    const {setWeekType, weekType} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

    const iconAnimation = {
        animationName: "smooth-expanding-20px",
        animationDuration: "0.1s"
    }
    const iconDecayAnimation = {
        animationName: "smooth-shrinking-20px",
        animationDuration: "0.1s"
    }

    const iconSmallAnimation = {
        animationName: "smooth-expanding-9px",
        animationDuration: "0.1s"
    }
    const iconDecaySmallAnimation = {
        animationName: "smooth-shrinking-9px",
        animationDuration: "0.1s"
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                    <div className={weekType === "odd" ? "toggle-slider-untoggled" : "toggle-slider-toggled"}></div>
                </div>

                <button className={weekType === "even" ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={deactivateClickHandler}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", zIndex: "2"}}>
                        {weekType === "odd" ?
                            (windowWidth <= 930 ? <OddWeekIconSmall style={iconSmallAnimation}/> :
                                <OddWeekIcon style={iconAnimation}/>) : (windowWidth <= 930 ?
                                <div style={iconDecaySmallAnimation}></div> : <div style={iconDecayAnimation}></div>)
                        } {/*TODO переделать чтобы размеры иконок менялись только через стили*/}
                        <div className={weekType === "even" ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={deactivateClickHandler} style={{display: "flex", alignItems: "center"}}>
                            Нечетная
                        </div>
                    </div>
                </button>

                {windowWidth <= 930 ? <div style={{width: "4px"}}></div> : null}

                <div className={weekType === "odd" ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={activateClickHandler}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", zIndex: "2"}}>
                        {weekType === "even" ?
                            (windowWidth <= 930 ? <EvenWeekIconSmall style={iconSmallAnimation}/> :
                                <EvenWeekIcon style={iconAnimation}/>) : (windowWidth <= 930 ?
                                <div style={iconDecaySmallAnimation}></div> : <div style={iconDecayAnimation}></div>)
                        }
                        <div className={weekType === "odd" ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={activateClickHandler} style={{display: "flex", alignItems: "center"}}>
                            Четная
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default WeekToggle;