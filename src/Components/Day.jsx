import React, {useEffect, useState} from "react";
import "../index.css";
import DayHeader from "./DayHeader";
import Class from "./Class";
import Window from "./Window";
import {ReactComponent as AddIcon} from "../assets/addIcon.svg";

const Day = ({dayData, dayName, downloadFailure, current, onEditToggle, placeholderHeight}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [saveButtonPosition, setSaveButtonPosition] = useState({top: 0, left: 0});
    let classesCount = dayData?.classes?.length || 0;

    function calculateDistanceBetweenElements(elementId1, elementId2) {
        const getElementDistanceFromTop = function (elementId) {
            const element = document.getElementById(elementId);
            const elementRect = element.getBoundingClientRect();


            return elementRect.bottom + window.scrollY;
        }

        const distance1 = getElementDistanceFromTop(elementId1);
        const distance2 = getElementDistanceFromTop(elementId2);

        //эта дура по итогу высчитывает расстояние от day-full до конца страницы (вроде)
        return Math.abs(distance2 - distance1);
    }

    // eslint-disable-next-line default-case
    switch (classesCount) {
        case 3:
        case 4:
            if (dayData.classes[1].isWindow || dayData.classes[2].isWindow) {
                classesCount = classesCount - 1;
            }
            break;
    }
    if (downloadFailure) classesCount = 0;

    const handleDayEditToggle = () => {
        setIsEditing(!isEditing);
        onEditToggle(!isEditing);
    };


    useEffect(() => {
        const relativeElement = document.getElementById("day-full editing");
        if (relativeElement) {
            const rect = relativeElement.getBoundingClientRect();

            setSaveButtonPosition({
                top: rect.height + 37,
                left: rect.width - 172,
            });

            console.log(calculateDistanceBetweenElements("day-full editing", "footer"));
            if (calculateDistanceBetweenElements("day-full editing", "footer") - 71 < 70) {
                console.log("мало места, передал выше");
            }
        }
    }, [isEditing]);

    const editText = isEditing ? (
        <div className="day-edit-text" style={{top: "-34px", left: "20px"}}>
            Редактирование
        </div>
    ) : null;

    function handleDaySave() {
        setIsEditing(!isEditing);
        onEditToggle(!isEditing);
    }

    const saveButton = isEditing ?
        (<div className="day-save-button"
              style={{top: saveButtonPosition.top + "px", left: saveButtonPosition.left + "px"}}
              onClick={handleDaySave}>Сохранить</div>)
        : null;

    return (
        <div className={isEditing ? "day-full editing" : "day-full"} id={isEditing ? "day-full editing" : "day-full"}>
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
            {isEditing ? (
                <div className="day-end-block animated">
                    <div className="add-icon">
                        <AddIcon/>
                    </div>
                </div>
            ) : (
                <div className="day-end-block"></div>
            )}
            {saveButton}
        </div>
    );
};

export default Day;
