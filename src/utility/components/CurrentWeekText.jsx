import { getStartAndEndOfWeek, getWeekNumber } from "../DateHelpers.js";
import { useWindowWidth } from "../../common";

function GetCurrentWeekText({ date }) {
    const windowWidth = useWindowWidth();

    const currentStudyWeek = getWeekNumber(date);
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);

    if (currentStudyWeek % 2 === 0) {
        return (
            <div>
                Сейчас четная (нижняя) неделя {windowWidth <= 445 ? <br/> : "-"} с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя
            </div>
        );
    } else {
        return (
            <div>
                Сейчас нечетная (верхняя) неделя {windowWidth <= 445 ? <br/> : "-"} с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя
            </div>
        );
    }
}

export default GetCurrentWeekText;
