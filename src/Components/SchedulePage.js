import React from 'react';
import "../index.css";
import Header from "./Header";
import Monday from "./Monday";
import Footer from "./Footer";
import GetCurrentWeekText from "./CurrentWeekText";
import GetNextWeekText from "./NextWeekText";

const SchedulePage = () => {
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
                    <Monday/>
                    <Monday/>
                    <Monday/>
                    <Monday/>
                    <Monday/>
                    <Monday/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SchedulePage;
