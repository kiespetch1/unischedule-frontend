import React, {useEffect, useRef, useState} from "react";
import "../index.css";
import DayHeader from "./DayHeader";
import Class from "./Class";
import Window from "./Window";
import {ReactComponent as AddIcon} from "../assets/addIcon.svg";
import SaveButton from "./SaveButton";

const Day = ({dayData, dayName, downloadFailure, current, onEditToggle, togglePlaceholder, refreshComponent}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [saveButtonPosition, setSaveButtonPosition] = useState({top: 0, left: 0});
    const [activeClassIndex, setActiveClassIndex] = useState(null);
    const [newClasses, setNewClasses] = useState([]);
    const [realIndex, setRealIndex] = useState(null);
    const classRefs = useRef([]);

    const [classesCount, setClassesCount] = useState(0);

    useEffect(() => {
        const count = (dayData?.classes?.length || 0) + newClasses.length;
        setClassesCount(count);
    }, [dayData, newClasses]);

    const decreaseClassesCount = () => {
        setClassesCount(classesCount - 1);
    }

    function compareStartTime(a, b) {
        const timeToSeconds = time => {
            const [hours, minutes, seconds] = time.split(':').map(Number);
            return hours * 3600 + minutes * 60 + seconds;
        };

        return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
    }

    const handleClassClick = index => {
        if (activeClassIndex === index) {
            setActiveClassIndex(null);
        } else {
            setActiveClassIndex(index);
        }
    };

    const handleActiveChange = (index, isActive) => {
        if (!isActive) {
            setActiveClassIndex(null);
        } else {
            setActiveClassIndex(index);
        }
    };

    const handleClassUpdate = (index, field, value) => {
        setNewClasses(prevClasses => {
            const updatedClasses = [...prevClasses];
            updatedClasses[index] = {...updatedClasses[index], [field]: value};
            return updatedClasses;
        });
    };


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
            if (dayData?.classes[1]?.isWindow || dayData?.classes[2]?.isWindow) {
                setClassesCount(classesCount - 1);
            }
            break;
    }
    if (downloadFailure) setClassesCount(0);

    const handleDayEditToggle = () => {
        setIsEditing(!isEditing);
        onEditToggle(!isEditing);
        if (isEditing)
            setActiveClassIndex(null);
    };

    const handleClassAdd = () => {
        const newClassData = {id: dayData.dayInfo.id};
        setNewClasses(prevClasses => [...prevClasses, newClassData]);
        classRefs.current.push(React.createRef());
    };

    const handleNewClassDelete = (indexToRemove) => {
        setNewClasses(prevClasses => prevClasses.filter((_, index) => index !== indexToRemove - realIndex - 1));
        setActiveClassIndex(null);
        classRefs.current = classRefs.current.filter((_, index) => index !== indexToRemove - realIndex - 1);
    };

    function handleDaySave() {
        const ref = classRefs.current[activeClassIndex];
        if (ref && ref.current) {
            ref.current.forceSaveClass();
        } else {
            console.log(`Ref ${activeClassIndex} is not initialized correctly.`);
        }

        setIsEditing(!isEditing);
        onEditToggle(!isEditing);
        togglePlaceholder(false);
        setTimeout(() => {
            setNewClasses([]);
            refreshComponent();
        }, 200);
    }

    useEffect(() => {
        const targetElement = document.getElementById("day-full editing");

        if (targetElement) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const {width, height} = entry.contentRect;

                    setSaveButtonPosition({
                        top: height + 12,
                        left: width - 172,
                    });
                }
            });

            resizeObserver.observe(targetElement);

            return () => {
                resizeObserver.unobserve(targetElement);
            };
        }
    }, [saveButtonPosition]);

    useEffect(() => {
        const relativeElement = document.getElementById("day-full editing");
        if (relativeElement) {
            const rect = relativeElement.getBoundingClientRect();

            setSaveButtonPosition({
                top: rect.height + 37,
                left: rect.width - 172,
            });

            if (calculateDistanceBetweenElements("day-full editing", "footer") - 71 < 70) {
                togglePlaceholder(true);
            }
        }
    }, [isEditing, togglePlaceholder]);

    useEffect(() => {
        const classesLength = dayData?.classes?.length || 0;
        const newClassesLength = newClasses.length || 0;
        classRefs.current = new Array(classesLength + newClassesLength).fill().map((_, i) => classRefs.current[i] || React.createRef());
        setRealIndex(classesLength);
    }, [dayData?.classes, newClasses.length]);

    const editText = isEditing ? (
        <div className="day-edit-text" style={{top: "-34px", left: "20px"}}>
            Редактирование
        </div>
    ) : null;

    return (
        <div className={isEditing ? "day-full editing" : "day-full"} id={isEditing ? "day-full editing" : "day-full"}>
            <DayHeader name={dayName} classCount={classesCount} current={current}
                       isEditing={isEditing}
                       editing={handleDayEditToggle}
                       placeholder={togglePlaceholder}/>
            {downloadFailure || classesCount === 0 ? (
                <div className="day-empty-block-top">
                    <div className="empty-text">Выходной день</div>
                </div>
            ) : (
                dayData?.classes?.sort(compareStartTime).map((classData, index) => (
                    <React.Fragment key={index}>
                        {classData.isWindow ?
                            <Window order={(index + 1).toString()}
                                    dayData={dayData}
                                    isEditing={isEditing}
                                    isActive={isEditing && activeClassIndex === index}
                                    onClick={() => handleClassClick(index)}
                                    onActiveChange={(isActive) => handleActiveChange(index, isActive)}/>
                            :
                            <Class ref={classRefs.current[index]}
                                   order={(index + 1).toString()}
                                   dayData={dayData}
                                   isEditing={isEditing}
                                   isActive={isEditing && activeClassIndex === index}
                                   onClick={() => handleClassClick(index)}
                                   onActiveChange={(isActive) => handleActiveChange(index, isActive)}
                                   isNew={false}
                                   decreaseClassesCount={decreaseClassesCount}/>}
                    </React.Fragment>
                ))
            )}
            {editText}
            {newClasses.length > 0 ? newClasses.map((classData, index) => (
                <React.Fragment key={realIndex + index}>
                    <Class ref={classRefs.current[realIndex + index]}
                           order={(realIndex + index + 1).toString()}
                           dayData={classData}
                           isEditing={isEditing}
                           isActive={isEditing && activeClassIndex === realIndex + index}
                           onClick={() => handleClassClick(realIndex + index)}
                           onActiveChange={(isActive) => handleActiveChange(realIndex + index, isActive)}
                           onUpdate={(field, value) => handleClassUpdate(realIndex + index, field, value)}
                           isNew={true}
                           handleNewClassDelete={handleNewClassDelete}
                           decreaseClassesCount={decreaseClassesCount}/>
                </React.Fragment>
            )) : null}
            {isEditing ? (
                <button className="day-end-block animated" onClick={handleClassAdd}>
                    <div className="add-icon">
                        <AddIcon/>
                    </div>
                </button>
            ) : (
                <div className="day-end-block"></div>
            )}
            <SaveButton isEditing={isEditing} saveButtonPosition={saveButtonPosition} onSave={handleDaySave}/>
        </div>
    );
};

export default Day;
