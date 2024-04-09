import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import {ReactComponent as SearchIcon} from "../assets/search.svg";
import {ReactComponent as CrossIcon} from "../assets/cross.svg";
import CourseGroups from "./CourseGroups";


const GroupsListPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [groupsInfo, setGroupsInfo] = useState("");
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

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
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch("https://localhost:7184/api/groups", requestOptions)
            .then(response => response.json())
            .then(data => {
                setGroupsInfo(data);
            })
            .catch(error => {
                console.log("Ошибка при загрузке данных: " + error);
            });
    }, []);

    return (
        <div>
            <Header/>
            <div className="groups-container">
                <div className="groups-choose-text">Группы</div>
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

                <CourseGroups grade="1" groups={groupsInfo}/>
                <CourseGroups grade="2" groups={groupsInfo}/>
                <CourseGroups grade="3" groups={groupsInfo}/>
                <CourseGroups grade="4" groups={groupsInfo}/>

                <div className="group-add-text">Вашей группы нет в списке? Напишите <a
                    style={{whiteSpace: 'nowrap', color: "#767676"}}
                    href="https://t.me/kiespetchq"
                    target="_blank" rel="noreferrer"> мне</a>.
                </div>
            </div>
            <Footer/>
        </div>)
}

export default GroupsListPage;
