import React, { useEffect, useMemo, useState} from "react";
import "../index.css";
import HeaderDay from "./DayHeader";
import TopClass from "./TopClass";
import Class from "./Class";
import Window from "./Window";

const Day = ({dayId, dayName}) => {

    const requestOptions = useMemo(() => ({
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }), []);

    const [dayInfoData, setDayInfoData] = useState(null);

    useEffect(() => {
        if(dayId != null) {
            fetch("https://localhost:7184/api/days/byId?id=" + dayId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDayInfoData(data);
                })
                .catch(error => {
                    console.log("Ошибка при загрузке данных: " + error);
                });
        }
    }, [dayId, requestOptions]);

    const classesCount = dayInfoData?.classes?.length || 0;

    return (

        <div className="day-full">
            <HeaderDay name={dayName} classCount={classesCount}/>
            {classesCount === 0 ? (
                <div className="day-empty-block-top"> {/*TODO зачем отдельный класс?*/}
                    <div className="empty-text">Выходной день</div>
                </div>
            ) : null}

            {/*это рендер первого блока*/}
            {classesCount >= 1 && dayInfoData.classes && dayInfoData.classes.length > 0 && !dayInfoData.classes[0].isWindow ? (
                <TopClass
                    classType={dayInfoData.classes[0].type}
                    name={dayInfoData.classes[0].name}
                    startTime={dayInfoData.classes[0].startTime && dayInfoData.classes[0].startTime.slice(0, 5)}
                    endTime={dayInfoData.classes[0].endTime && dayInfoData.classes[0].endTime.slice(0, 5)}
                    weekType={dayInfoData.classes[0].weekType}
                    subgroup={dayInfoData.classes[0].subgroup}
                    teacherId={dayInfoData.classes[0].teacherId}
                    locationId={dayInfoData.classes[0].locationId}
                />
            ) : null}

            {classesCount >= 1 && dayInfoData.classes && dayInfoData.classes.length > 0 && dayInfoData.classes[0].isWindow ? (
                <Window />
            ) : null}

            {/*это рендер второго блока*/}

            {classesCount >= 2 && dayInfoData.classes && dayInfoData.classes.length > 0 && !dayInfoData.classes[1].isWindow ? (
                <Class
                    classType={dayInfoData.classes[1].type}
                    name={dayInfoData.classes[1].name}
                    startTime={dayInfoData.classes[1].startTime && dayInfoData.classes[1].startTime.slice(0, 5)}
                    endTime={dayInfoData.classes[1].endTime && dayInfoData.classes[1].endTime.slice(0, 5)}
                    weekType={dayInfoData.classes[1].weekType}
                    subgroup={dayInfoData.classes[1].subgroup}
                    teacherId={dayInfoData.classes[1].teacherId}
                    locationId={dayInfoData.classes[1].locationId}
                />
            ) : null}

            {classesCount >= 2 && dayInfoData.classes && dayInfoData.classes.length > 0 && dayInfoData.classes[1].isWindow ? (
                <Window />
            ) : null}


            {classesCount >= 3 && dayInfoData.classes && dayInfoData.classes.length > 0 && !dayInfoData.classes[2].isWindow ? (
                <Class
                    classType={dayInfoData.classes[2].type}
                    name={dayInfoData.classes[2].name}
                    startTime={dayInfoData.classes[2].startTime && dayInfoData.classes[2].startTime.slice(0, 5)}
                    endTime={dayInfoData.classes[2].endTime && dayInfoData.classes[2].endTime.slice(0, 5)}
                    weekType={dayInfoData.classes[2].weekType}
                    subgroup={dayInfoData.classes[2].subgroup}
                    teacherId={dayInfoData.classes[2].teacherId}
                    locationId={dayInfoData.classes[2].locationId}
                />
            ) : null}

            {classesCount >= 3 && dayInfoData.classes && dayInfoData.classes.length > 0 && dayInfoData.classes[2].isWindow ? (
                <Window />
            ) : null}

            {classesCount >= 4 && dayInfoData.classes && dayInfoData.classes.length > 0 && !dayInfoData.classes[3].isWindow ? (
                <Class
                    classType={dayInfoData.classes[3].type}
                    name={dayInfoData.classes[3].name}
                    startTime={dayInfoData.classes[3].startTime && dayInfoData.classes[3].startTime.slice(0, 5)}
                    endTime={dayInfoData.classes[3].endTime && dayInfoData.classes[3].endTime.slice(0, 5)}
                    weekType={dayInfoData.classes[3].weekType}
                    subgroup={dayInfoData.classes[3].subgroup}
                    teacherId={dayInfoData.classes[3].teacherId}
                    locationId={dayInfoData.classes[3].locationId}
                />
            ) : null}

            {classesCount >= 4 && dayInfoData.classes && dayInfoData.classes.length > 0 && dayInfoData.classes[3].isWindow ? (
                <Window />
            ) : null}
            <div className="day-end-block"></div>
        </div>
    );
};

export default Day;
