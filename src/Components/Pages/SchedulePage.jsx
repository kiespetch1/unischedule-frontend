import React, {useState, useEffect, useContext} from 'react';
import "../../index.css";
import Header from "../Header";
import Day from "../Day";
import Footer from "../Footer";
import Context from "../../Context";
import {ReactComponent as AlertIcon} from "../../assets/alert.svg";
import WeeksText from "../WeeksText";
import Filters from "../Filters";
import {useParams} from "react-router-dom";
import GroupNotFoundPage from "./GroupNotFoundPage";
import ScheduleSkeleton from "../Skeletons/ScheduleSkeleton";
import NotificationsLine from "../NotificationsLine";
import NotificationLineSkeleton from "../Skeletons/NotificationLineSkeleton";

const SchedulePage = () => {
    const [weekInfo, setWeekInfo] = useState(null);
    const {subgroup, setSubgroup, weekType, setWeekType} = useContext(Context);
    const [downloadFailure, setDownloadFailureStatus] = useState(false);
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [isEditing, setIsEditing] = useState(false);
    const [placeholderHeight, setPlaceholderHeight] = useState(0);
    const [refreshElement, setRefreshElement] = useState(0);
    const [isIdPresent, setIsIdPresent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasSubgroups, setHasSubgroups] = useState("false");
    const [groupName, setGroupName] = useState(null);
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let params = useParams();
    const groupId = params.groupId;

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

    const refreshComponent = () => {
        setRefreshElement(refreshElement + 1);
    };

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
        const getRequestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://localhost:7184/api/groups/getUsedIds", getRequestOptions);
                const data = await response.json();
                const isPresent = data.includes(parseInt(groupId));
                setIsIdPresent(isPresent);

                if (isPresent) {
                    const urlParams = new URLSearchParams(window.location.search);
                    const weekParam = urlParams.get('week');
                    const subgroupParam = urlParams.get('subgroup');

                    if (!weekParam && weekType === null) setWeekType("odd");
                    if (!subgroupParam && subgroup === null) setSubgroup(1);

                    const groupResponse = await fetch(`https://localhost:7184/api/groups/${groupId}`, getRequestOptions);
                    const groupData = await groupResponse.json();
                    setHasSubgroups(groupData.hasSubgroups);
                    setGroupName(groupData.name);

                    if (groupId != null && subgroup != null && weekType != null && weekType !== "null") {
                        let url = `https://localhost:7184/api/weeks?weekType=${weekType === "odd" ? 1 : 2}&groupId=${groupId}`;

                        if (groupData.hasSubgroups) {
                            url += `&subgroup=${subgroup}`;
                        }

                        const weekResponse = await fetch(url, getRequestOptions);
                        const weekData = await weekResponse.json();
                        setWeekInfo(weekData);
                        setDownloadFailureStatus(false);
                    }
                }
            } catch (error) {
                console.log("Ошибка при загрузке данных: " + error);
                setDownloadFailureStatus(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [groupId, setSubgroup, setWeekType, subgroup, weekType, refreshElement]);


    if (isLoading) {
        return (
            <div className="schedule-page">
                <Header groupName={groupName} groupId={groupId}/>
                <Filters groupName={groupName} hasSubgroups={hasSubgroups} isLoading={isLoading}/>
                <div className="schedule-container">
                    <WeeksText currentWeekType={weekType}/>
                    <NotificationLineSkeleton windowWidth={windowWidth}/>
                    <div className="days-container">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="day-full">
                                <ScheduleSkeleton windowWidth={windowWidth}/>
                            </div>))}
                    </div>
                </div>
            </div>
        );
    }


    if (!isIdPresent) {
        return (<GroupNotFoundPage/>);
    }


    return (
        <div className="schedule-page">
            <Header groupName={groupName} groupId={groupId}/>
            <Filters groupName={groupName}
                     hasSubgroups={hasSubgroups}
                     isLoading={isLoading}/>
            <div className="schedule-container">
                <div className={isEditing ? "blur-element" : null}></div>
                <WeeksText currentWeekType={weekType} windowWidth={windowWidth}/>
                <NotificationsLine windowWidth={windowWidth} groupId={groupId}/>
                {downloadFailure ? <div className="alert-container">
                    <AlertIcon style={windowWidth <= 930 ? alertSmallStyle : alertStyle}/>
                    <div className="alert-text">Ошибка загрузки расписания, заполнена не вся неделя.</div>
                </div> : null}

                <div className="days-container">
                    {days.map((dayName, index) => (
                        <Day
                            refreshComponent={refreshComponent}
                            key={dayName}
                            dayData={weekInfo && weekInfo[dayName]}
                            dayName={getRussianDayName(index)}
                            downloadFailure={downloadFailure}
                            current={getTodayName() === dayName}
                            onEditToggle={setIsEditing}
                            togglePlaceholder={togglePlaceholder}
                            weekInfo={weekInfo}
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
