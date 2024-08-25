import {useEffect, useState} from 'react';
import CourseGroups from "./CourseGroups";
import SearchIcon from "../assets/search.svg?react";
import CrossIcon from "../assets/cross.svg?react";
import Skeleton from "react-loading-skeleton";
import {GET_REQUEST_OPTIONS_WITH_AUTH, useWindowWidth} from "../common";

const GroupsComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [groupsInfo, setGroupsInfo] = useState("");
    const [isLoaded, setLoaded] = useState(false);
    const windowWidth = useWindowWidth();

    const crossIconStyle = {
        height: "14px",
        width: "14px",
        cursor: "pointer",
        animationName: "smooth-expanding-14px",
        animationDuration: "0.1s"
    }

    const crossIconSmallStyle = {
        height: "7px",
        width: "7px",
        cursor: "pointer",
        animationName: "smooth-expanding-7px",
        animationDuration: "0.1s"
    }

    const searchIconStyle = {
        height: "18px",
        width: "18px",
        margin: "0 16px 0 12px",
        transform: "scaleX(-1)"
    }

    const searchIconSmallStyle = {
        height: "9px",
        width: "9px",
        margin: "0 8px 0 6px",
        transform: "scaleX(-1)"
    }

    function clearInput() {
        setInputValue('');
    }

    useEffect(() => {
        fetch("https://localhost:7184/api/groups", GET_REQUEST_OPTIONS_WITH_AUTH)
            .then(response => response.json())
            .then(data => {
                setGroupsInfo(data.data);
                setLoaded(true);
            })
            .catch(error => {
                console.log("Ошибка при загрузке данных: " + error);
            });
    }, []);

    return (

        <div className="groups-container">
            {<div className="groups-choose-text">Группы</div>}
            <div className="search-bar">
                <SearchIcon style={windowWidth <= 930 ? searchIconSmallStyle : searchIconStyle}/>
                <input className="search-bar-input" type="search" placeholder="Введите название группы"
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       id="group-search"/>
                {inputValue && inputValue.length > 0 ?
                    <CrossIcon style={windowWidth <= 930 ? crossIconSmallStyle : crossIconStyle}
                               onClick={clearInput}/> : null}
            </div>

            {!isLoaded ? <div style={{maxWidth: '300px'}}>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} style={{marginBottom: '20px'}}>
                            <Skeleton height={18} width={100} style={{marginBottom: '10px', marginTop: "24px"}}/>
                            <div style={{display: "flex", flexDirection: 'row'}}>
                                <Skeleton height={39} width={150}
                                          style={{borderRadius: '20px', marginTop: '16px', marginRight: "16px"}}/>
                                <Skeleton height={39} width={150}
                                          style={{borderRadius: '20px', marginTop: '16px', marginRight: "16px"}}/>
                            </div>
                        </div>
                    ))}
                </div> :
                <>
                    <CourseGroups grade="1" groups={groupsInfo} filter={inputValue}/>
                    <CourseGroups grade="2" groups={groupsInfo} filter={inputValue}/>
                    <CourseGroups grade="3" groups={groupsInfo} filter={inputValue}/>
                    <CourseGroups grade="4" groups={groupsInfo} filter={inputValue}/>
                </>
            }

            <div className="group-add-text">Вашей группы нет в списке? Напишите <a
                style={{whiteSpace: 'nowrap', color: "#767676"}}
                href="https://t.me/kiespetchq"
                target="_blank" rel="noreferrer"> мне</a>.
            </div>
        </div>
    );
}

export default GroupsComponent;