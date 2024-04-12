import React, {useState} from "react";
import "../index.css";
import DayHeader from "./DayHeader";
import Class from "./Class";
import Window from "./Window";
import {ReactComponent as AddIcon} from "../assets/addIcon.svg";

const Day = ({dayData, dayName, downloadFailure, current, onEditToggle}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTextPosition, setEditTextPosition] = useState({top: 0, left: 0});
    let classesCount = dayData?.classes?.length || 0;

    // eslint-disable-next-line default-case
    switch (classesCount) {
        case 3:
        case 4:
            if (dayData.classes[1].isWindow || dayData.classes[2].isWindow) {
                classesCount = classesCount - 1
            }

            break;
    }
    if (downloadFailure)
        classesCount = 0;

    const handleDayEditToggle = () => {
        setIsEditing(!isEditing);
        onEditToggle(!isEditing);
    };

    const handleMouseEnter = () => {
        const relativeElement = document.getElementById("day-full");
        const rect = relativeElement.getBoundingClientRect();
        const parentRect = relativeElement.parentElement.getBoundingClientRect();
        setEditTextPosition({
            top: rect.top - parentRect.top - 48, // Вычитаем верхний край родительского элемента
            left: rect.left - parentRect.left + 13, // Вычитаем левый край родительского элемента
        });
        console.log(rect.top - parentRect.top - 48, rect.left - parentRect.left + 13);
    };

    const editText = isEditing ? (
        <div
            className="day-edit-text"
            style={{top: editTextPosition.top + "px", left: editTextPosition.left + "px"}}>
            Редактирование
        </div>
    ) : null;

    return (
        <div
            className={isEditing ? "day-full editing" : "day-full"}
            id="day-full"
            onMouseEnter={handleMouseEnter}
        >
            <DayHeader name={dayName} classCount={classesCount} current={current} editing={handleDayEditToggle}/>
            {downloadFailure || classesCount === 0 ? (
                <div className="day-empty-block-top">
                    <div className="empty-text">Выходной день</div>
                </div>
            ) : (
                dayData?.classes?.map((classData, index) => (
                    <React.Fragment key={index}>
                        {classData.isWindow ? <Window/> : <Class order={(index + 1).toString()} dayData={dayData}/>}
                    </React.Fragment>
                ))
            )}
            {editText}
            {isEditing ?
                <div className="day-end-block animated">
                    <div className="add-icon"><AddIcon/></div>
                </div> :
                <div className="day-end-block"></div>
            }
        </div>
    );
};

export default Day;