import React, {useState} from "react";
import "../index.css";
import DayHeader from "./DayHeader";
import Class from "./Class";
import Window from "./Window";

const Day = ({dayData, dayName, downloadFailure, current}) => {
    const [isEditing, setIsEditing] = useState(false);
    let classesCount = dayData?.classes?.length || 0;
    let hasWindow = false;

    const handleDayEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // eslint-disable-next-line default-case
    switch (classesCount) {
        case 3:
        case 4:
            if (dayData.classes[1].isWindow || dayData.classes[2].isWindow) {
                classesCount = classesCount - 1
                hasWindow = true;
            }

            break;
    }
    if (downloadFailure)
        classesCount = 0;


    return (
        <div className="day-full">
            <DayHeader name={dayName} classCount={classesCount} current={current} editing={handleDayEditToggle}/>
            {classesCount === 0 || downloadFailure ? (
                <div className="day-empty-block-top">
                    <div className="empty-text">Выходной день</div>
                </div>
            ) : null}

            {/*это рендер первого блока*/}
            {classesCount >= 1 && !dayData.classes[0].isWindow && !downloadFailure ? (
                <Class
                    isTop={true}
                    order="1"
                    dayData={dayData}
                />
            ) : null}

            {classesCount >= 1 && dayData.classes[0].isWindow && !downloadFailure ? (
                <Window/>
            ) : null}

            {/*это рендер второго блока*/}

            {classesCount >= 2 && !dayData.classes[1].isWindow && !downloadFailure ? (
                <Class
                    order="2"
                    dayData={dayData}
                />
            ) : null}

            {classesCount >= 2 && dayData.classes[1].isWindow && !downloadFailure ? (
                <Window/>
            ) : null}

            {/*это рендер третьего блока*/}

            {(classesCount >= 3 || (classesCount >= 2 && hasWindow)) && !dayData.classes[2].isWindow && !downloadFailure ? (
                <Class
                    order="3"
                    dayData={dayData}
                />
            ) : null}

            {classesCount >= 3 && dayData.classes[2].isWindow && !downloadFailure ? (
                <Window/>
            ) : null}

            {/*это рендер четверого блока*/}

            {(classesCount >= 4 || (classesCount >= 3 && hasWindow)) && !dayData.classes[3].isWindow && !downloadFailure ? (
                <Class
                    order="4"
                    dayData={dayData}
                />
            ) : null}

            {classesCount >= 4 && dayData.classes[3].isWindow ? (
                <Window/>
            ) : null}
            <div className="day-end-block"></div>
        </div>
    );
};

export default Day;
