import { getStartAndEndOfWeek, getWeekNumber } from "../DateHelpers.js";
import { useWindowWidth } from "../../common";

function GetCurrentWeekText({ date }) {
    const windowWidth = useWindowWidth();

    const currentStudyWeek = getWeekNumber(date);
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);

    if (currentStudyWeek % 2 === 0) {
        return (
            <div>
                Сейчас четная неделя {windowWidth <= 445 ? <br/> : "-"} с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя (нижняя/четная)
            </div>
        );
    } else {
        return (
            <div>
                Сейчас нечетная неделя {windowWidth <= 445 ? <br/> : "-"} с {startOfWeek} по {endOfWeek} - {currentStudyWeek} неделя (верхняя/нечетная)
            </div>
        );
    }
}

export default GetCurrentWeekText;
