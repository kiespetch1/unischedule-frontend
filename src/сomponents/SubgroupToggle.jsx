import {useCallback, useContext, useEffect, useState} from "react";
import "../index.css";
import FirstSG from "../assets/1sg.svg?react";
import SecondSG from "../assets/2sg.svg?react"
import ScheduleContext from "../context/ScheduleContext";
import {useNavigate, useLocation} from 'react-router-dom';
import {useWindowWidth} from "../common";

const SubgroupToggle = () => {
    const {setSubgroup, subgroup} = useContext(ScheduleContext);
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

    const setSubgroupOne = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('subgroup', '1');
        navigate(`?${searchParams.toString()}`);
        setSubgroup(1);
    }, [setSubgroup, navigate, location.search]);

    const setSubgroupTwo = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('subgroup', '2'); 
        navigate(`?${searchParams.toString()}`);
        setSubgroup(2);
    }, [setSubgroup, navigate, location.search]);

    useEffect(() => {
        if (!initialized) {
            const searchParams = new URLSearchParams(location.search);
            const subgroup = searchParams.get('subgroup');
            if (parseInt(subgroup) === 2) {
                setSubgroupTwo();
            } else if (parseInt(subgroup) === 1) {
                setSubgroupOne();
            }
            setInitialized(true);
        }
    }, [initialized, location, setSubgroupTwo, setSubgroupOne]);

    const activateClickHandler = (event) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'div' || target.tagName.toLowerCase() === 'button') {
            if (
                target.className.includes("toggle-inner-inactive") ||
                target.className.includes("toggle-text-inactive")
            ) {
                setSubgroupTwo();
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
                setSubgroupOne()
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
                    <div className={subgroup === 2 ? "toggle-slider-toggled" : "toggle-slider-untoggled"}></div>
                </div>

                <button className={subgroup === 2 ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={deactivateClickHandler}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", zIndex: "2"}}>
                        {subgroup === 1 ?
                            (windowWidth <= 930 ? <FirstSG style={iconSmallAnimation}/> :
                                <FirstSG style={iconAnimation}/>) : (windowWidth <= 930 ?
                                <div style={iconDecaySmallAnimation}></div> : <div style={iconDecayAnimation}></div>)
                        }
                        <div className={subgroup === 2 ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={deactivateClickHandler} style={{display: "flex", alignItems: "center", zIndex: "2"}}>
                            Первая
                        </div>
                    </div>
                </button>

                {windowWidth <= 930 ? <div style={{width: "4px"}}></div> : null}

                <button className={subgroup === 1 ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={activateClickHandler}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", zIndex: "2"}}>
                        {subgroup === 2 ?
                            (windowWidth <= 930 ? <SecondSG style={iconSmallAnimation}/> :
                                <SecondSG style={iconAnimation}/>) : (windowWidth <= 930 ?
                                <div style={iconDecaySmallAnimation}></div> : <div style={iconDecayAnimation}></div>)
                        }
                        <div className={subgroup === 1 ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={activateClickHandler} style={{display: "flex", alignItems: "center"}}>
                            Вторая
                        </div>
                    </div>
                </button>

            </div>
        </div>
    );
};
export default SubgroupToggle;
