import React, {useCallback, useContext, useEffect, useState} from "react";
import "../index.css";
import Context from "../Context";
import {useNavigate, useLocation} from 'react-router-dom';
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as FirstSGSmall} from "../assets/1sgSmall.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg"
import {ReactComponent as SecondSGSmall} from "../assets/2sgSmall.svg"


const SubgroupToggle = () => {
    const {setSubgroup, subgroup} = useContext(Context);
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

    const setSubgroupOne = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('subgroup', '1');
        navigate(`?${searchParams.toString()}`);        setSubgroup(1);
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
        if (target.tagName.toLowerCase() === 'div') {
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
        if (target.tagName.toLowerCase() === 'div') {
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
                <div className={subgroup === 2 ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={deactivateClickHandler}>
                    <div style={{display: "flex"}}>
                        {subgroup === 1 ?
                            (windowWidth <= 930 ? <FirstSGSmall style={iconSmallAnimation}/> :
                                <FirstSG style={iconAnimation}/>) : (windowWidth <= 930 ?
                                <div style={iconDecaySmallAnimation}></div> : <div style={iconDecayAnimation}></div>)}
                        <div className={subgroup === 2? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={deactivateClickHandler}
                             style={{display: "flex", alignItems: "center"}}>
                            Первая
                        </div>
                    </div>
                </div>

                <div className={subgroup === 1 ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={activateClickHandler}>
                    <div style={{display: "flex"}}>
                        {subgroup === 2 ?
                            (windowWidth <= 930 ? <SecondSGSmall style={iconSmallAnimation}/> :
                                <SecondSG style={iconAnimation}/>) : (windowWidth <= 930 ?
                                <div style={iconDecaySmallAnimation}></div> : <div style={iconDecayAnimation}></div>)}
                        <div className={subgroup === 1 ? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={activateClickHandler}
                             style={{display: "flex", alignItems: "center"}}>
                            Вторая
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SubgroupToggle;

