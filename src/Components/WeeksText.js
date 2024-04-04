import React, {useCallback, useContext} from 'react';
import GetCurrentWeekText from "./CurrentWeekText";
import GetNextWeekText from "./NextWeekText";
import Context from "../Context";
import {useLocation, useNavigate} from "react-router-dom";

const WeeksText = ({currentWeekType }) => {
    const {setWeekType} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const setWeekOdd = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('week', 'odd');
        navigate(`?${searchParams.toString()}`);
        setWeekType("odd");
    }, [setWeekType, navigate, location.search]);

    const setWeekEven = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('week', 'even');
        navigate(`?${searchParams.toString()}`);
        setWeekType("even");
    }, [setWeekType, navigate, location.search]);

    function isWeekEven() {
        const today = new Date();
        const academicYearStart = new Date(today.getFullYear(), 1, 5); // Начало учебного года

        // Вычисляем разницу в миллисекундах между сегодняшней датой и началом учебного года
        const diffMilliseconds = today - academicYearStart;

        // Количество миллисекунд в одной неделе
        const oneWeekMilliseconds = 1000 * 60 * 60 * 24 * 7;

        // Вычисляем номер учебной недели от начала учебного года
        const academicWeekNumber = Math.floor(diffMilliseconds / oneWeekMilliseconds);

        // Проверяем четность номера учебной недели
        return academicWeekNumber % 2 === 0;
    }


    return (
        <div className="week-container">

            {!isWeekEven() ? (currentWeekType === "odd" ? <div>
                <div className="week-text" onClick={setWeekEven} style={{marginBottom: "7px", cursor: "pointer"}} title="Посмотреть расписание для четной недели" >
                    <GetCurrentWeekText date={new Date()}/>
                </div>
                <div className="week-text" style={{fontWeight: "600"}}>
                    <GetNextWeekText
                        date={new Date(new Date().setDate(new Date().getDate() + 7))}/>
                </div>
            </div> : <div>
                <div className="week-text" style={{fontWeight: "600", marginBottom: "7px"}}>
                    <GetCurrentWeekText date={new Date()}/>
                </div>
                <div className="week-text" onClick={setWeekOdd} style={{cursor: "pointer"}} title="Посмотреть расписание для нечетной недели">
                    <GetNextWeekText
                        date={new Date(new Date().setDate(new Date().getDate() + 7))}/>
                </div>
            </div>) : (currentWeekType === "odd" ? <div>
                <div className="week-text" style={{fontWeight: "600", marginBottom: "7px"}}>
                    <GetCurrentWeekText date={new Date()}/>
                </div>
                <div className="week-text" onClick={setWeekEven} style={{cursor: "pointer"}} title="Посмотреть расписание для четной недели">
                    <GetNextWeekText
                        date={new Date(new Date().setDate(new Date().getDate() + 7))}/>
                </div>
            </div> : <div>
                <div className="week-text" onClick={setWeekOdd} style={{cursor: "pointer", marginBottom: "7px"}} title="Посмотреть расписание для нечетной недели">
                    <GetCurrentWeekText date={new Date()}/>
                </div>
                <div className="week-text" style={{fontWeight: "600"}}>
                    <GetNextWeekText
                        date={new Date(new Date().setDate(new Date().getDate() + 7))}/>
                </div>
            </div>)}

        </div>
    );
};

export default WeeksText;
