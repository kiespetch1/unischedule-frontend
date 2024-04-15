import React, {useState, useEffect, useContext} from 'react';
import "../index.css";
import Header from "./Header";
import Day from "./Day";
import Footer from "./Footer";
import Context from "../Context";
import {ReactComponent as AlertIcon} from "../assets/alert.svg";
import WeeksText from "./WeeksText";
import Filters from "./Filters";

const SchedulePage = ({group}) => {
    const [weekInfo, setWeekInfo] = useState(null);
    const {subgroup, setSubgroup, weekType, setWeekType} = useContext(Context);
    const [downloadFailure, setDownloadFailureStatus] = useState(false);
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [isEditing, setIsEditing] = useState(false);
    const [placeholderHeight, setPlaceholderHeight] = useState(0);
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const alertStyle = {
        width: "24px",
        height: "24px",
    };

    const alertSmallStyle = {
        width: "12px",
        height: "12px",
    }

    const togglePlaceholder = (placeholderState) => {
        if (placeholderState)
            setPlaceholderHeight(51);
        else
            setPlaceholderHeight(0);
    }

    function getRussianDayName(day) {
        const daysRu = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
        return daysRu[day];
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

        const urlParams = new URLSearchParams(window.location.search);
        const weekParam = urlParams.get('week');
        const subgroupParam = urlParams.get('subgroup');

        if (!weekParam && weekType === null)
            setWeekType("odd")

        if (!subgroupParam && subgroup === null)
            setSubgroup(1)

        if (group != null && subgroup != null && weekType != null && weekType !== "null") {
            fetch("https://localhost:7184/api/weeks?weekType=" + (weekType === "odd" ? 1 : 2) +
                "&groupId=" + group + "&subgroup=" + subgroup, requestOptions)
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

    }, [group, setSubgroup, setWeekType, subgroup, weekType]);

    return (
        <div className="schedule-page">
            <Header/>
            <Filters groupName={weekInfo && weekInfo.group.name}/>
            <div className="app-container">
                <div className={isEditing ? "blur-element" : null}></div>
                <WeeksText currentWeekType={weekType}/>
                {downloadFailure ? <div className="alert-container">
                    <AlertIcon style={windowWidth <= 930 ? alertSmallStyle : alertStyle}/>
                    <div className="alert-text">Ошибка загрузки расписания, заполнена не вся неделя.</div>
                </div> : null}

                <div className="days-container">
                    {days.map((dayName, index) => (
                        <Day
                            key={dayName}
                            dayData={weekInfo && weekInfo[dayName]}
                            dayName={getRussianDayName(index)}
                            downloadFailure={downloadFailure}
                            current={getTodayName() === dayName}
                            onEditToggle={setIsEditing}
                            togglePlaceholder={togglePlaceholder}
                        />
                    ))}
                </div>
                <div style={{height: placeholderHeight + "px", width: "auto"}}></div>
            </div>

            <Footer/>
        </div>
    );
};

export default SchedulePage;
