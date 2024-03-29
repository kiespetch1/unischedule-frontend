import React, {useEffect, useMemo, useState} from "react";
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


const Class = ({classType, weekType, subgroup, name, startTime, endTime, teacherId, locationId}) => {

    const dotStyle = {
        flexGrow: "1",
        height: "100%",
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

    const requestOptions = useMemo(() => ({
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }), []);

    function containsLetters(str) {
        return /[a-zA-Zа-яА-Я]/.test(str);
    }

    const [teacherInfo, setTeacherInfo] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

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
        fetch("https://localhost:7184/api/teachers?id=" + teacherId, requestOptions)
            .then(response => response.json())
            .then(data => {
                setTeacherInfo(data);
            })
            .catch(error => {
                console.log("Ошибка при загрузке данных: " + error);
            });
    }, [requestOptions, teacherId]);

    useEffect(() => {
        fetch("https://localhost:7184/api/locations?id=" + locationId, requestOptions)
            .then(response => response.json())
            .then(data => {
                setLocationInfo(data);
            })
            .catch(error => {
                console.log("Ошибка при загрузке данных: " + error);
            });
    }, [locationId, requestOptions]);

    return (
        <section className="day-block">
            <div className="main-content">
                <div className="info-row">
                    <div className="class-time">{startTime} - {endTime}</div>
                    <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>

                    <div className="class-type">{(
                        classType === 0 ? "Лекция" :
                            classType === 1 ? "Практика" :
                                classType === 2 ? "Лаб. работа" : "Ошибка")}
                    </div>
                    {(weekType === 0 && subgroup === 0 ? null :
                        <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>)}
                    {(weekType === 0 ? null
                        : weekType === 1 ? (windowWidth <= 930 ? <OddWeekIconSmall style={signSmallStyle}/> :
                                <OddWeekIcon style={signStyle}/>)
                            : weekType === 2 ? (windowWidth <= 930 ? <EvenWeekIconSmall style={signSmallStyle}/> :
                                    <EvenWeekIcon style={signStyle}/>) :
                                null)}
                    {(subgroup === 0 ? null
                        : subgroup === 1 ? (windowWidth <= 930 ? <FirstSGSmall style={lastSignSmallStyle}/> :
                                <FirstSG style={lastSignStyle}/>)
                            : subgroup === 2 ? (windowWidth <= 930 ? <SecondSGSmall style={lastSignSmallStyle}/> :
                                    <SecondSG style={lastSignStyle}/>) :
                                null)}
                </div>
                <div className="info-row">
                    <div className="class-name">
                        {name}
                    </div>
                </div>
                <div className="info-row">
                    <div className="class-teacher">{teacherInfo && teacherInfo.fullName}</div>
                </div>
            </div>
            <aside className="location-info">
                <div
                    className="location-type">{locationInfo && (locationInfo.locationType === 0 ? "Очно" : "Дистант")}
                </div>
                <div>
                    {(locationInfo && locationInfo.locationType === 0 && containsLetters(locationInfo.classroom)) &&
                        <div className="irl-letters-location">
                            {locationInfo.classroom}
                        </div>
                    }
                    {(locationInfo && !containsLetters(locationInfo.classroom) && locationInfo.locationType === 0) &&
                        <div className="irl-location">
                            {locationInfo.classroom}
                        </div>
                    }
                    {(locationInfo && locationInfo.locationType === 1) &&
                        <a href={locationInfo.link} target="_blank" rel="noreferrer" className="distant-location">
                            Ссылка
                        </a>
                    }
                </div>
            </aside>
        </section>)
}

export default Class;