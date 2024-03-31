import React, {useContext, useEffect, useState} from 'react';
import "../index.css";
import Header from "./Header";
import Day from "./Day";
import Footer from "./Footer";
import GetCurrentWeekText from "./CurrentWeekText";
import GetNextWeekText from "./NextWeekText";
import Context from "../Context";
import {ReactComponent as AlertIcon} from "../assets/alert.svg";

const SchedulePage = ({group}) => {
    const [weekInfo, setWeekInfo] = useState(null);
    const {subgroup, weekType} = useContext(Context);
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

    }, [currentGroup, subgroup, weekType]);

    return (
        <div className="App">
            <header>
                <Header/>
            </header>
            <div className="app-container">
                <div className="week-container">
                    <strong className="current-week-text">
                        <GetCurrentWeekText date={new Date()}/>
                    </strong>
                    <div className="next-week-text">
                        <GetNextWeekText
                            date={new Date(new Date().setDate(new Date().getDate() + 7 - new Date().getDay()))}/>
                    </div>
                </div>
                {downloadFailure ? <div className="alert-container">
                    <AlertIcon style={windowWidth <= 930 ? alertSmallStyle : alertStyle} />
                    <div className="alertText">Ошибка загрузки расписания, заполнена не вся неделя.</div>
                </div> : null}

                <div className="days-container">
                    {<Day dayData={weekInfo && weekInfo.monday} dayName="Понедельник"
                          downloadFailure={downloadFailure}/>}
                    {<Day dayData={weekInfo && weekInfo.tuesday} dayName="Вторник" downloadFailure={downloadFailure}/>}
                    {<Day dayData={weekInfo && weekInfo.wednesday} dayName="Среда" downloadFailure={downloadFailure}/>}
                    {<Day dayData={weekInfo && weekInfo.thursday} dayName="Четверг" downloadFailure={downloadFailure}/>}
                    {<Day dayData={weekInfo && weekInfo.friday} dayName="Пятница" downloadFailure={downloadFailure}/>}
                    {<Day dayData={weekInfo && weekInfo.saturday} dayName="Суббота" downloadFailure={downloadFailure}/>}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SchedulePage;
