import React from "react";

function GetCurrentWeekText({ date }) {
    const getWeekNumber = () => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    function getStartAndEndOfWeek(date) {
        const dayOfWeek = date.getDay();
        const currentDay = date.getDate();
        const startOfWeek = new Date(date);
        const endOfWeek = new Date(date);

        startOfWeek.setDate(currentDay - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
        endOfWeek.setDate(currentDay + (6 - dayOfWeek) % 7);

        const formatDate = (date) => {
            let day = date.getDate().toString().padStart(2, "0");
            let month = (date.getMonth() + 1).toString().padStart(2, "0");
            let year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };

        return {
            startOfWeek: formatDate(startOfWeek),
            endOfWeek: formatDate(endOfWeek),
        };
    }

    let currentStudyWeek = getWeekNumber(date) - 5;
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);

    if (currentStudyWeek % 2 === 0) {
        return (
            <div>
                Сейчас четная неделя - с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя (нижняя/четная)
            </div>
        );
    } else {
        return (
            <div>
                Сейчас нечетная неделя - с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя (верхняя/нечетная)
            </div>
        );
    }
}

export default GetCurrentWeekText;
