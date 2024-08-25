import {useCallback, useContext} from 'react';
import GetCurrentWeekText from "../utility/components/CurrentWeekText";
import GetNextWeekText from "../utility/components/NextWeekText";
import {useLocation, useNavigate} from "react-router-dom";
import ScheduleContext from "../context/ScheduleContext";

const WeeksText = ({currentWeekType, windowWidth}) => {
    const {setWeekType} = useContext(ScheduleContext);
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

        const diffMilliseconds = today - academicYearStart;
        const oneWeekMilliseconds = 1000 * 60 * 60 * 24 * 7;
        const academicWeekNumber = Math.floor(diffMilliseconds / oneWeekMilliseconds);
        return academicWeekNumber % 2 === 0;
    }


    return (
        <div className="week-container">

            {!isWeekEven() ? (currentWeekType === "odd" ? <div>
                <div className="week-text"
                     onClick={setWeekEven}
                     style={windowWidth <= 930 ? {cursor: "pointer", marginBottom: "3px"} : {
                         cursor: "pointer",
                         marginBottom: "7px"
                     }}
                     title="Посмотреть расписание для четной недели">
                    <GetCurrentWeekText date={new Date()}/>
                </div>
                <div className="week-text"
                     style={{fontWeight: "600"}}>
                    <GetNextWeekText
                        date={new Date(new Date().setDate(new Date().getDate() + 7))}/>
                </div>
            </div> : <div>
                <div className="week-text"
                     style={windowWidth <= 930 ? {cursor: "pointer", marginBottom: "3px",fontWeight: "600",} : {
                         cursor: "pointer",
                         marginBottom: "7px",
                         fontWeight: "600"
                     }}>
                    <GetCurrentWeekText date={new Date()}/>
                </div>
                <div className="week-text" onClick={setWeekOdd}
                     style={{cursor: "pointer"}}
                     title="Посмотреть расписание для нечетной недели">
                    <GetNextWeekText
                        date={new Date(new Date().setDate(new Date().getDate() + 7))}/>
                </div>
            </div>) : (currentWeekType === "odd" ? <div>
                <div className="week-text" style={windowWidth <= 930 ? {cursor: "pointer", marginBottom: "3px",fontWeight: "600",} : {
                    cursor: "pointer",
                    marginBottom: "7px",
                    fontWeight: "600"
                }}>
                    <GetCurrentWeekText date={new Date()}/>
                </div>
                <div className="week-text" onClick={setWeekEven}
                     style={{cursor: "pointer"}}
                     title="Посмотреть расписание для четной недели">
                    <GetNextWeekText
                        date={new Date(new Date().setDate(new Date().getDate() + 7))}/>
                </div>
            </div> : <div>
                <div className="week-text" onClick={setWeekOdd}
                     style={windowWidth <= 930 ? {cursor: "pointer", marginBottom: "3px"} : {
                         cursor: "pointer",
                         marginBottom: "7px"
                     }}
                     title="Посмотреть расписание для нечетной недели">
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
