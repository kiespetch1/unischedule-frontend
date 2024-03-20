import React, {useEffect, useState} from 'react';
import "../index.css";
import Header from "./Header";
import Day from "./Day";
import Footer from "./Footer";
import GetCurrentWeekText from "./CurrentWeekText";
import GetNextWeekText from "./NextWeekText";

const SchedulePage = () => {
        const [weekInfo, setWeekInfo] = useState(null);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch("https://localhost:7184/api/weeks?weekType=1&group=0&subgroup=1", requestOptions)
            .then(response => response.json())
            .then(data => {
                setWeekInfo(data);
            })
            .catch(error => {
                console.log("Ошибка при загрузке данных: " + error);
            });
    }, []);



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
                    {weekInfo && <Day dayId={weekInfo.mondayId}/>}
                    {weekInfo && <Day dayId={weekInfo.tuesdayId}/>}
                    {weekInfo && <Day dayId={weekInfo.wednesdayId}/>}
                    {weekInfo && <Day dayId={weekInfo.thursdayId}/>}
                    {weekInfo && <Day dayId={weekInfo.fridayId}/>}
                    {weekInfo && <Day dayId={weekInfo.saturdayId}/>}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SchedulePage;
