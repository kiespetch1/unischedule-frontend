import React, {useEffect, useMemo, useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import {ReactComponent as DotDivider} from "../assets/blackDot.svg";
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg"



const Class = ({classType, weekType, subgroup, name, startTime, endTime, teacherId, locationId}) => {
    const dotStyle = {
        flexGrow: "1",
        height: "100%",
        paddingLeft: "15px",
        paddingRight: "15px",
    };

    const signStyle = {
        flexGrow: "1",
        paddingRight: "15px",
        width: "24px",
        height: "24px",
    };

    const lastSignStyle = {
        flexGrow: "1",
        width: "24px",
        height: "24px",
    };

    const requestOptions = useMemo(() => ({
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }), []);

    const [teacherInfo, setTeacherInfo] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);

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
                    <DotDivider style={dotStyle}/>
                    <div className="class-type">{(
                        classType === 0 ? "Лекция" :
                            classType === 1 ? "Практика" :
                                classType === 2 ? "Лаб. работа" : "Ошибка")}
                    </div>
                    {(weekType === 0 ? null : <DotDivider style={dotStyle}/>)}
                    {(weekType === 0 ? null
                        : weekType === 1 ? <OddWeekIcon style={signStyle}/>
                            : weekType === 2 ? <EvenWeekIcon style={signStyle}/> :
                                null)}
                    {(subgroup === 0 ? null
                        : subgroup === 1 ? <FirstSG style={lastSignStyle}/>
                            : subgroup === 2 ? <SecondSG style={lastSignStyle}/> :
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
                    className="location-type">{locationInfo && (locationInfo.locationType === 0 ? "Очно" : "Дистант")}</div>
                <div
                    className="irl-location">{locationInfo && (locationInfo.locationType === 0 ? locationInfo.classroom :
                    <a className="distant-location" href={locationInfo.link}>Ссылка</a>)}</div>
            </aside>
        </section>)
}

export default Class;