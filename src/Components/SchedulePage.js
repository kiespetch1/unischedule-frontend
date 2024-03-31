import React, {useContext, useEffect, useState} from 'react';
import "../index.css";
import Header from "./Header";
import Day from "./Day";
import Footer from "./Footer";
import Context from "../Context";
import {ReactComponent as AlertIcon} from "../assets/alert.svg";
import WeeksText from "./WeeksText";

const SchedulePage = ({group}) => {
    const [weekInfo, setWeekInfo] = useState(null);
    const {subgroup, setSubgroup, weekType, setWeekType} = useContext(Context);
    const currentGroup = group - 1;
    const [downloadFailure, setDownloadFailureStatus] = useState(false);
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

    const alertStyle = {
        width: "24px",
        height: "24px",
    };

    const alertSmallStyle = {
        width: "12px",
        height: "12px",
    }

    function getTodayName() {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const today = new Date().getDay();
        return days[today];
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
        }

        if (weekType === null)
            setWeekType("even")

        if(subgroup === null)
            setSubgroup(1)

        if (currentGroup != null && subgroup != null && weekType != null && weekType !== "null") {
            console.log("https://localhost:7184/api/weeks?weekType=" + (weekType === "odd" ? 1 : 2) +
                "&group=" + currentGroup + "&subgroup=" + subgroup);
            fetch("https://localhost:7184/api/weeks?weekType=" + (weekType === "odd" ? 1 : 2) +
                "&group=" + currentGroup + "&subgroup=" + subgroup, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDownloadFailureStatus(false);
                    setWeekInfo(data);
                })
                .catch(error => {
                    console.log("Ошибка при загрузке данных: " + error);
                    setDownloadFailureStatus(true);
                });
        }

    }, [currentGroup, setSubgroup, setWeekType, subgroup, weekType]);

    return (
        <div className="App">
            <header>
                <Header/>
            </header>
            <div className="app-container">
                <WeeksText currentWeekType={weekType}/>

                {downloadFailure ? <div className="alert-container">
                    <AlertIcon style={windowWidth <= 930 ? alertSmallStyle : alertStyle}/>
                    <div className="alertText">Ошибка загрузки расписания, заполнена не вся неделя.</div>
                </div> : null}

                <div className="days-container">
                    {<Day dayData={weekInfo && weekInfo.monday} dayName="Понедельник" downloadFailure={downloadFailure} current={getTodayName() === "monday"}/>}
                    {<Day dayData={weekInfo && weekInfo.tuesday} dayName="Вторник" downloadFailure={downloadFailure} current={getTodayName() === "tuesday"}/>}
                    {<Day dayData={weekInfo && weekInfo.wednesday} dayName="Среда" downloadFailure={downloadFailure} current={getTodayName() === "wednesday"}/>}
                    {<Day dayData={weekInfo && weekInfo.thursday} dayName="Четверг" downloadFailure={downloadFailure} current={getTodayName() === "thursday"}/>}
                    {<Day dayData={weekInfo && weekInfo.friday} dayName="Пятница" downloadFailure={downloadFailure} current={getTodayName() === "friday"}/>}
                    {<Day dayData={weekInfo && weekInfo.saturday} dayName="Суббота" downloadFailure={downloadFailure} current={getTodayName() === "saturday"}/>}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SchedulePage;
