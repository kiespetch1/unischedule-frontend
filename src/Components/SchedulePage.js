import React, {useContext, useEffect, useState} from 'react';
import "../index.css";
import Header from "./Header";
import Day from "./Day";
import Footer from "./Footer";
import GetCurrentWeekText from "./CurrentWeekText";
import GetNextWeekText from "./NextWeekText";
import Context from "../Context";

const SchedulePage = ({group}) => {
    const [weekInfo, setWeekInfo] = useState(null);
    const {subgroup, weekType} = useContext(Context);
    const currentGroup = group - 1;

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log("https://localhost:7184/api/weeks?weekType=" + (weekType === "odd" ? 1 : 2) +
            "&group=" + currentGroup + "&subgroup=" + subgroup);
        fetch("https://localhost:7184/api/weeks?weekType=" + (weekType === "odd" ? 1 : 2) +
            "&group=" + currentGroup + "&subgroup=" + subgroup, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setWeekInfo(data);
            })
            .catch(error => {
                console.log("Ошибка при загрузке данных: " + error);
            });
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
                <div className="days-container">
                    {weekInfo && <Day dayId={weekInfo.mondayId} dayName="Понедельник"/>}
                    {weekInfo && <Day dayId={weekInfo.tuesdayId} dayName="Вторник"/>}
                    {weekInfo && <Day dayId={weekInfo.wednesdayId} dayName="Среда"/>}
                    {weekInfo && <Day dayId={weekInfo.thursdayId} dayName="Четверг"/>}
                    {weekInfo && <Day dayId={weekInfo.fridayId} dayName="Пятница"/>}
                    {weekInfo && <Day dayId={weekInfo.saturdayId} dayName="Суббота"/>}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SchedulePage;
