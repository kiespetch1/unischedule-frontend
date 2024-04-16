import React, {useEffect, useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as EvenWeekIconSmall} from "../assets/evenWeekSmall.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import {ReactComponent as OddWeekIconSmall} from "../assets/oddWeekSmall.svg";
import {ReactComponent as DotDivider} from "../assets/blackDot.svg";
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as FirstSGSmall} from "../assets/1sgSmall.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg"
import {ReactComponent as SecondSGSmall} from "../assets/2sgSmall.svg"
import {ReactComponent as AddIcon} from "../assets/addInfoIcon.svg"


const Class = ({order, dayData, isClickable, isActive, onClick}) => {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [teachers, setTeachers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isAddingTeachers, setIsAddingTeachers] = useState(false);
    const [isAddingLocation, setIsAddingLocation] = useState(false);

    const dotStyle = {
        flexGrow: "1",
        height: "5px",
        width: "5px",
        paddingLeft: "15px",
        paddingRight: "15px",
    };

    const dotSmallStyle = {
        flexGrow: "1",
        height: "2.5px",
        width: "2.5px",
        paddingLeft: "9px",
        paddingRight: "9px",
    };

    const signStyle = {
        flexGrow: "1",
        paddingRight: "15px",
        width: "24px",
        height: "24px",
    };

    const signSmallStyle = {
        flexGrow: "1",
        paddingRight: "9px",
        width: "14px",
        height: "14px",
    };

    const lastSignStyle = {
        flexGrow: "1",
        width: "24px",
        height: "24px",
    };

    const lastSignSmallStyle = {
        flexGrow: "1",
        width: "14px",
        height: "14px",
    };

    function containsLetters(str) {
        return /[a-zA-Zа-яА-Я]/.test(str);
    }
    const handleTeacherAdd = () => {
        setIsAddingTeachers(true);
    }

    const handleTeacherSave = () => {
        setIsAddingTeachers(false);
    };
    const teacherEditPanel =
        <div className="class-edit-teacher-main-container">
            <div className="class-edit-teacher-container first">
                <div className="class-edit-main-text">Преподаватель:</div>
                <div className="class-edit-new-option" onClick={handleTeacherAdd}><AddIcon/></div>
                {teachers.map((item, index) => (
                    <div key={index} className="class-edit-option">
                        {item.fullName}
                    </div>
                ))}
            </div>

            {isAddingTeachers ?
                <div className="class-edit-teacher-container second">
                    <div className="class-edit-panel-add-teacher-container">
                        <div className="class-edit-secondary-text">ФИО преподавателя:</div>
                        <div className="class-edit-input"></div>
                        <div className="edit-panel-save-button" onClick={handleTeacherSave}>Добавить</div>
                    </div>
                </div>
                : null}
        </div>
    ;

    const locationEditPanel =
        <div className="class-edit-panel-location-container">
            <div className="class-edit-main-text">Локация:</div>
            <div className="class-edit-new-option"><AddIcon/></div>
            {locations.map((item, index) => (
                <div key={index} className="class-edit-option">
                    {item.locationType === 0 ? item.classroom : item.link}
                </div>
            ))}
        </div>;


    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7184/api/teachers", requestOptions);
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных: ', error);
                setTeachers([]);
            }

            try {
                const response = await fetch("https://localhost:7184/api/locations", requestOptions);
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных: ', error);
                setLocations([]);
            }
        };

        fetchData();
    }, [isActive]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <section className={order === "1" ? "day-block-top" : "day-block"}
                     onClick={onClick}
                     style={isClickable ? isActive ? {backgroundColor: "#E9E9E9"} : {cursor: "pointer"}
                         : isActive ? {backgroundColor: "#E9E9E9"} : null}
            >
                <div className="main-content">
                    <div className="info-row">
                        <div
                            className="class-time">
                            {dayData.classes[order - 1].startTime.slice(0, 5)
                            } - {dayData.classes[order - 1].endTime.slice(0, 5)}</div>
                        <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>

                        <div className="class-type">{(
                            dayData.classes[order - 1].type === 0 ? "Лекция" :
                                dayData.classes[order - 1].type === 1 ? "Практика" :
                                    dayData.classes[order - 1].type === 2 ? "Лаб. работа" : "Ошибка")}
                        </div>
                        {(dayData.classes[order - 1].weekType === 0 && dayData.classes[order - 1].subgroup === 0 ?
                            null :
                            <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>)}
                        {(dayData.classes[order - 1].weekType === 0 ? null
                            : dayData.classes[order - 1].weekType === 1 ? (windowWidth <= 930 ?
                                    <OddWeekIconSmall style={signSmallStyle}/> :
                                    <OddWeekIcon style={signStyle}/>)
                                : dayData.classes[order - 1].weekType === 2 ? (windowWidth <= 930 ?
                                        <EvenWeekIconSmall style={signSmallStyle}/> :
                                        <EvenWeekIcon style={signStyle}/>) :
                                    null)}
                        {(dayData.classes[order - 1].subgroup === 0 ? null
                            : dayData.classes[order - 1].subgroup === 1 ? (windowWidth <= 930 ?
                                    <FirstSGSmall style={lastSignSmallStyle}/> :
                                    <FirstSG style={lastSignStyle}/>)
                                : dayData.classes[order - 1].subgroup === 2 ? (windowWidth <= 930 ?
                                        <SecondSGSmall style={lastSignSmallStyle}/> :
                                        <SecondSG style={lastSignStyle}/>) :
                                    null)}
                    </div>
                    <div className="info-row">
                        <div className="class-name">
                            {dayData.classes[order - 1].name}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="class-teacher">{dayData.teachers[order - 1]}</div>
                    </div>
                </div>
                <aside className="location-info">
                    <div
                        className="location-type">{(dayData.locations[order - 1].locationType === 0 ?
                        "Очно"
                        : "Дистант")}
                    </div>
                    <div>
                        {(dayData.locations[order - 1].locationType === 0 && containsLetters(
                                dayData.locations[order - 1].classroom)) &&
                            <div className="irl-letters-location">
                                {dayData.locations[order - 1].classroom}
                            </div>
                        }
                        {(!containsLetters(dayData.locations[order - 1].classroom) &&
                                dayData.locations[order - 1].locationType === 0) &&
                            <div className="irl-location">
                                {dayData.locations[order - 1].classroom}
                            </div>
                        }
                        {(dayData.locations[order - 1].locationType === 1) &&
                            <a href={dayData.locations[order - 1].link} target="_blank" rel="noreferrer"
                               className="distant-location">
                                Ссылка
                            </a>
                        }
                    </div>
                </aside>
            </section>

            {isActive ? <div className="class-edit-panel-container">
                {teacherEditPanel}
                {locationEditPanel}
            </div> : null}
        </div>)
}

export default Class;
