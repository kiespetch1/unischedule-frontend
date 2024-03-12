import React from "react";

function GetNextWeekText({ date }) {
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
        endOfWeek.setDate(currentDay + (7 - dayOfWeek) % 7);
        console.log(startOfWeek)
        console.log(endOfWeek)

        const formatDate = (date) => {
            let day = date.getDate().toString().padStart(2, "0");
            let month = (date.getMonth() + 1).toString().padStart(2, "0");
            let year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };

        return {
            startOfWeek: formatDate(new Date(startOfWeek.setDate(startOfWeek.getDate() + 7))),
            endOfWeek: formatDate(new Date(endOfWeek.setDate(endOfWeek.getDate() + 6))), //супер костыль потому что брались первые и последние дни недели от нынешней даты, а не от той которая передана
                                                                                        // т.к. у нас всегда грубо говоря разрыв в неделю это решение пойдет, но желательно переписать позже
        };
    }

    let currentStudyWeek = getWeekNumber(date) - 5;
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);

    if (currentStudyWeek % 2 === 0) {
        return (
            <div>
                Следующая неделя четная - с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя (нижняя/четная)
            </div>
        );
    } else {
        return (
            <div>
                Следующая неделя нечетная - с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя (верхняя/нечетная)
            </div>
        );
    }
}

export default GetNextWeekText;
