import { getStartAndEndOfWeek, getWeekNumber } from "../DateHelpers.js";

function GetCurrentWeekText({ date }) {

    const currentStudyWeek = getWeekNumber(date);
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);

    if (currentStudyWeek % 2 === 0) {
        return (
            <div>
                Сейчас четная (нижняя) неделя - с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя
            </div>
        );
    } else {
        return (
            <div>
                Сейчас нечетная (верхняя) неделя - с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя
            </div>
        );
    }
}

export default GetCurrentWeekText;
