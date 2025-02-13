import {useState, useEffect, useContext} from 'react';
import "../index.css";
import Header from "../сomponents/Header";
import Day from "../сomponents/Day";
import Footer from "../сomponents/Footer";
import ScheduleContext from "../context/ScheduleContext";
import AlertIcon from "../assets/alert.svg?react";
import WeeksText from "../сomponents/WeeksText";
import Filters from "../сomponents/Filters";
import {useParams} from "react-router-dom";
import GroupNotFoundPage from "./GroupNotFoundPage";
import ScheduleSkeleton from "../сomponents/skeletons/ScheduleSkeleton";
import NotificationsLine from "../сomponents/NotificationsLine";
import NotificationLineSkeleton from "../сomponents/skeletons/NotificationLineSkeleton";
import {GET_REQUEST_OPTIONS_WITH_AUTH, useWindowWidth} from "../common";

const SchedulePage = () => {
    const [weekInfo, setWeekInfo] = useState(null);
    const {subgroup, setSubgroup, weekType, setWeekType} = useContext(ScheduleContext);
    const [downloadFailure, setDownloadFailureStatus] = useState(false);
    const windowWidth = useWindowWidth();
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
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/groups/getUsedIds", GET_REQUEST_OPTIONS_WITH_AUTH);
                const data = await response.json();
                const isPresent = data.includes(parseInt(groupId));
                setIsIdPresent(isPresent);

                if (isPresent) {
                    const urlParams = new URLSearchParams(window.location.search);
                    const weekParam = urlParams.get('week');
                    const subgroupParam = urlParams.get('subgroup');

                    if (!weekParam && weekType === null) setWeekType("odd");
                    if (!subgroupParam && subgroup === null) setSubgroup(1);

                    const groupResponse = await fetch(`/api/groups/${groupId}`, GET_REQUEST_OPTIONS_WITH_AUTH);
                    const groupData = await groupResponse.json();
                    setHasSubgroups(groupData.hasSubgroups);
                    setGroupName(groupData.name);

                    document.title = `Расписание группы ${groupData.name}`;

                    if (groupId != null && subgroup != null && weekType != null && weekType !== "null") {
                        let url = `/api/weeks?weekType=${weekType === "odd" ? 1 : 2}&groupId=${groupId}`;

                        if (groupData.hasSubgroups) {
                            url += `&subgroup=${subgroup}`;
                        }

                        const weekResponse = await fetch(url, GET_REQUEST_OPTIONS_WITH_AUTH);
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
                <NotificationsLine groupId={groupId}/>
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
