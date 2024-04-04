import React, {useEffect, useState} from "react";

function GetNextWeekText({date}) {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function getWeekNumber(date) {
        let academicYearStart = new Date(date.getFullYear(), 1, 5);

        let diffDays = Math.floor((date - academicYearStart) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            academicYearStart = new Date(date.getFullYear() - 1, 1, 5);
            diffDays = Math.floor((date - academicYearStart) / (1000 * 60 * 60 * 24));
        }

        // Вычисляем номер недели, делим разницу в днях на 7 и прибавляем 1
        return Math.ceil((diffDays + 1) / 7);
    }

    function getStartAndEndOfWeek(date) {
        let currentDay = date.getDay();

        let daysUntilNextMonday = 1 - currentDay;
        if (daysUntilNextMonday > 0) {
            daysUntilNextMonday -= 7;
        }


        let daysUntilNextSaturday = 6 - currentDay;
        if (daysUntilNextSaturday < 0) {
        }

        let startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() + daysUntilNextMonday);
        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 5);

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

    let currentStudyWeek = getWeekNumber(date);
    const {startOfWeek, endOfWeek} = getStartAndEndOfWeek(date);

    if (currentStudyWeek % 2 === 0) {
        return (
            <div>
                Следующая неделя четная {windowWidth <= 445 ?
                <br/> : "-"} с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя (нижняя/четная)
            </div>
        );
    } else {
        return (
            <div>
                Следующая неделя нечетная {windowWidth <= 445 ?
                <br/> : "-"} с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя (верхняя/нечетная)
            </div>
        );
    }
}

export default GetNextWeekText;
