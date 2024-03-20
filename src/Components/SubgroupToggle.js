import React, {useCallback, useContext, useEffect, useState} from "react";
import "../index.css";
import Context from "../Context";
import {useNavigate, useLocation} from 'react-router-dom';
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg"


const SubgroupToggle = () => {
    const {setSubgroup, subgroup} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);
    const iconStyle = {
        animationName: "smooth-expanding",
        animationDuration: "0.1s",
    }
    const iconDecayStyle = {
        animationName: "smooth-shrinking",
        animationDuration: "0.1s",
    }

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
                            <FirstSG style={iconStyle}/> : <div style={iconDecayStyle}></div>}
                        <div className={subgroup === 2? "toggle-text-inactive" : "toggle-text-active"}
                             onClick={deactivateClickHandler}>
                            Первая
                        </div>
                    </div>
                </div>

                <div className={subgroup === 1 ? "toggle-inner-inactive" : "toggle-inner-active"}
                     onClick={activateClickHandler}>
                    <div style={{display: "flex"}}>
                        {subgroup === 2 ? <SecondSG style={iconStyle}/> : <div style={iconDecayStyle}></div>}
                        <div className={subgroup === 1 ? "toggle-text-inactive" : "toggle-text-active"}
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

