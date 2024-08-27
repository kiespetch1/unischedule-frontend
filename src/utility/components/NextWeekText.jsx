import { getStartAndEndOfWeek, getWeekNumber } from "../DateHelpers.js";
import { useWindowWidth } from "../../common";

function GetNextWeekText({ date }) {
    const windowWidth = useWindowWidth();

    const currentStudyWeek = getWeekNumber(date);
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);

    if (currentStudyWeek % 2 === 0) {
        return (
            <div>
                Следующая неделя четная (нижняя) {windowWidth <= 445 ? <br /> : "-"} с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя
            </div>
        );
    } else {
        return (
            <div>
                Следующая неделя нечетная (верхняя) {windowWidth <= 445 ? <br /> : "-"} с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя
            </div>
        );
    }
}

export default GetNextWeekText;
