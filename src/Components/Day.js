import React, {useEffect, useMemo, useState} from "react";
import "../index.css";
import HeaderDay from "./DayHeader";
import TopClass from "./TopClass";
import Class from "./Class";

const Day = ({dayId}) => {

    const requestOptions = useMemo(() => ({
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }), []);

    const [dayInfoData, setDayInfoData] = useState(null);


    useEffect(() => {
        fetch("https://localhost:7184/api/days/byId?id=" + dayId, requestOptions)
            .then(response => response.json())
            .then(data => {
                setDayInfoData(data);
            })
            .catch(error => {
                console.log("Ошибка при загрузке данных: " + error);
            });
    }, [dayId, requestOptions]);

    const classesCount = dayInfoData?.classes?.length || 0;

    return (

        <div className="day-full">
            <HeaderDay name="Понедельник" classCount={classesCount}/>
            {classesCount === 0 ? (
                <div className="day-empty-block-top">
                    <div className="empty-block">Выходной день</div>
                </div>
            ) : null}
            {classesCount >= 1 ? (
                <TopClass
                    classType={dayInfoData.classes[0].type}
                    name={dayInfoData.classes[0].name}
                    startTime={dayInfoData.classes[0].startTime.slice(0, 5)}
                    endTime={dayInfoData.classes[0].endTime.slice(0, 5)}
                    weekType={dayInfoData.classes[0].weekType}
                    subgroup={dayInfoData.classes[0].subgroup}
                    teacherId={dayInfoData.classes[0].teacherId}
                    locationId={dayInfoData.classes[0].locationId}
                />
            ) : null}

            {classesCount >= 2 ? (
                <Class classType={dayInfoData.classes[1].type}
                       name={dayInfoData.classes[1].name}
                       startTime={dayInfoData.classes[1].startTime.slice(0, 5)}
                       endTime={dayInfoData.classes[1].endTime.slice(0, 5)}
                       weekType={dayInfoData.classes[1].weekType}
                       subgroup={dayInfoData.classes[1].subgroup}
                       teacherId={dayInfoData.classes[1].teacherId}
                       locationId={dayInfoData.classes[1].locationId}/>
            ) : null}

            {classesCount >= 3 ? (
                <Class classType={dayInfoData.classes[2].type}
                       name={dayInfoData.classes[2].name}
                       startTime={dayInfoData.classes[2].startTime.slice(0, 5)}
                       endTime={dayInfoData.classes[2].endTime.slice(0, 5)}
                       weekType={dayInfoData.classes[2].weekType}
                       subgroup={dayInfoData.classes[2].subgroup}
                       teacherId={dayInfoData.classes[2].teacherId}
                       locationId={dayInfoData.classes[2].locationId}/>
            ) : null}

            {classesCount >= 4 ? (
                <Class classType={dayInfoData.classes[3].type}
                       name={dayInfoData.classes[3].name}
                       startTime={dayInfoData.classes[3].startTime.slice(0, 5)}
                       endTime={dayInfoData.classes[3].endTime.slice(0, 5)}
                       weekType={dayInfoData.classes[3].weekType}
                       subgroup={dayInfoData.classes[3].subgroup}
                       teacherId={dayInfoData.classes[3].teacherId}
                       locationId={dayInfoData.classes[3].locationId}/>
            ) : null}
        </div>
    );
};

export default Day;
