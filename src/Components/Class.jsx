import React, {useEffect, useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as EvenWeekIconSmall} from "../assets/evenWeekSmall.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import {ReactComponent as OddWeekIconSmall} from "../assets/oddWeekSmall.svg";
import {ReactComponent as DotDivider} from "../assets/blackDot.svg";
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as FirstSGSmall} from "../assets/1sgSmall.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg"
import {ReactComponent as SecondSGSmall} from "../assets/2sgSmall.svg"
import {ReactComponent as EmptyIcon} from "../assets/emptyWeekTypeIcon.svg";
import LocationPickPanel from "./LocationPickPanel";
import TeacherPickPanel from "./TeacherPickPanel";
import {ReactComponent as DeleteIcon} from "../assets/delete.svg";


const Class = ({order, dayData, isEditing, isActive, onClick, onActiveChange}) => {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [isAddingTeachers, setIsAddingTeachers] = useState(false);
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    const [isWeekTypeEditing, setIsWeekTypeEditing] = useState(false);

    const [newClassStartTime, setNewClassStartTime] = useState('');
    const [newClassEndTime, setNewClassEndTime] = useState('');
    const [newClassType, setNewClassType] = useState('');
    const [newLocationType, setNewLocationType] = useState('');
    const [newLocationTypeInfo, setNewLocationTypeInfo] = useState('0');
    const [newLocation, setNewLocation] = useState('');
    const [newLocationInfo, setNewLocationInfo] = useState('');
    const [newLink, setNewLink] = useState('');
    const [newClassName, setNewClassName] = useState('');
    const [newTeacher, setNewTeacher] = useState('');
    const [newTeacherName, setNewTeacherName] = useState('');


    const dotStyle = {
        flexGrow: "1",
        height: "5px",
        width: "5px",
        paddingLeft: "15px",
        paddingRight: "15px",
    };

    const dotEditStyle = {
        flexGrow: "1",
        height: "5px",
        width: "5px",
        paddingLeft: "11px",
        paddingRight: "11px",
    };

    const dotSmallStyle = {
        flexGrow: "1",
        height: "2.5px",
        width: "2.5px",
        paddingLeft: "9px",
        paddingRight: "9px",
    };

    const signStyle = {
        flexGrow: "1",
        paddingRight: "15px",
        width: "24px",
        height: "24px",
    };

    const signStyleNp = {
        flexGrow: "1",
        width: "24px",
        height: "24px",
    };

    const signSmallStyle = {
        flexGrow: "1",
        paddingRight: "9px",
        width: "14px",
        height: "14px",
    };

    const lastSignStyle = {
        flexGrow: "1",
        width: "24px",
        height: "24px",
    };

    const lastSignStyleNp = {
        flexGrow: "1",
        width: "24px",
        height: "24px",
    };

    const lastSignSmallStyle = {
        flexGrow: "1",
        width: "14px",
        height: "14px",
    };

    const postRequestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const deleteRequestOptions = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    function containsLetters(str) {
        return /[a-zA-Zа-яА-Я]/.test(str);
    }

    const isTimeInputValid = (input) => {
        return /^[0-9:]*$/.test(input);
    };

    const handleTeacherAdd = () => {
        setIsAddingTeachers(!isAddingTeachers);
    }

    const handleTeacherNameChange = (event) => {
        setNewTeacherName(event.target.value);
    }

    const handleTeacherSave = () => {
        if (newTeacherName !== '') {
            let name = newTeacherName.trim();
            fetch("https://localhost:7184/api/teachers?fullName=" + name, postRequestOptions)
                .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok: ' + response.status);
                        }
                    }
                )
                .catch(error => {
                    console.log("Ошибка при отправке данных: " + error);
                });
        }
        setIsAddingTeachers(false);
    };


    const handleLocationAdd = () => {
        setIsAddingLocation(!isAddingLocation);
    }

    const handleLocationSave = () => {
        if (newLocationInfo !== '' && newLocationTypeInfo !== '') {
            let locationInfo = newLocationInfo.trim();
            let typeQuery;
            let locationQuery;
            if (newLocationTypeInfo === '0') {
                typeQuery = "locationType=0";
                locationQuery = "&classroom=" + locationInfo;
            } else if (newLocationTypeInfo === '1') {
                typeQuery = "locationType=1";
                locationQuery = "&link=" + locationInfo;
            } else
                console.log("Unknown location type: " + newLocationType);

            fetch("https://localhost:7184/api/locations?" + typeQuery + locationQuery, postRequestOptions)
                .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok: ' + response.status);
                        }
                    }
                )
                .catch(error => {
                    console.log("Ошибка при отправке данных: " + error);
                });
        }

        setIsAddingLocation(false);
    }

    const handleClassStartTimeChange = (event) => {
        const input = event.target.value;
        if (isTimeInputValid(input)) {
            setNewClassStartTime(input);
        }
    };

    const handleClassEndTimeChange = (event) => {
        const input = event.target.value;
        if (isTimeInputValid(input)) {
            setNewClassEndTime(input);
        }
    };

    const handleClassTypeChange = (event) => {
        const input = event.target.value;
        setNewClassType(input);
    };

    const handleWeekTypeChange = () => {
        setIsWeekTypeEditing(!isWeekTypeEditing);
    }

    const handleLocationTypeChange = (event) => {
        const input = event.target.value;
        setNewLocationTypeInfo(input);
    }

    const handleLocationChange = (event) => {
        const input = event.target.value;
        setNewLocationInfo(input);
    }

    const handleLinkChange = (event) => {
        const input = event.target.value;
        setNewLink(input);
    }

    const handleClassNameChange = (event) => {
        const input = event.target.value;
        setNewClassName(input);
    }

    const handleTeacherChange = (event) => {
        const input = event.target.value;
        setNewTeacher(input);
    }

    const handleLocationPick = (locationType, nameOrLink) => {
        setNewLocationType(locationType);
        if (locationType === 0)
            setNewLocation(nameOrLink);
        else if (locationType === 1)
            setNewLink(nameOrLink);
    }
    const handleTeacherPick = (name) => {
        setNewTeacher(name);
    }

    const handleClassDelete = () => {
        fetch("https://localhost:7184/api/classes/" + dayId, deleteRequestOptions)
            .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                }
            )
            .catch(error => {
                console.log("Ошибка при отправке данных: " + error);
            });
    }


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let dayId = dayData.classes[order - 1].id;
    let classStartTime = dayData.classes[order - 1].startTime.slice(0, 5);
    let classEndTime = dayData.classes[order - 1].endTime.slice(0, 5);
    let classType = dayData.classes[order - 1].type;
    let weekType = dayData.classes[order - 1].weekType;
    let subgroup = dayData.classes[order - 1].subgroup;
    let className = dayData.classes[order - 1].name;
    let teacher = dayData.teachers[order - 1];
    let locationTypeSc = dayData.locations[order - 1].locationType;
    let classroom = dayData.locations[order - 1].classroom;
    let link = dayData.locations[order - 1].link;

    useEffect(() => {
        setNewClassStartTime(classStartTime);
        setNewClassEndTime(classEndTime);
        setNewClassType(classType);
        setNewLocationType(locationTypeSc);
        setNewLocation(classroom);
        setNewLink(link);
        setNewClassName(className);
        setNewTeacher(teacher);
    }, [classEndTime, className, classStartTime, classType, classroom, link, locationTypeSc, teacher, isEditing]);

    useEffect(() => {
        if (!isEditing) {
            onActiveChange(false);
        }
    }, [isEditing, onActiveChange]);

    return (
        <div>
            <section className={order === "1" ? "day-block-top" : "day-block"}
                     onClick={!isActive ? onClick : null}
                     style={isEditing ? isActive ? {backgroundColor: "#E9E9E9"} : {cursor: "pointer"}
                         : isActive ? {backgroundColor: "#E9E9E9"} : null}>
                <div className="main-content">
                    <div className={isActive ? "info-row editing" : "info-row"}>
                        {/*строка времени*/}
                        {isActive ? (
                                <>
                                    <input className="class-time editing"
                                           value={newClassStartTime}
                                           onChange={handleClassStartTimeChange}
                                           id="class-start-time"></input>
                                    <div className="class-time" style={{margin: "0 6px"}}>-</div>
                                    <input className="class-time editing"
                                           value={newClassEndTime}
                                           onChange={handleClassEndTimeChange}
                                           id="class-end-time"></input>
                                </>)
                            : (isEditing ? <div className="class-time">{newClassStartTime} - {newClassEndTime}</div> :
                                <div className="class-time">{classStartTime} - {classEndTime}</div>)
                        }

                        {isActive ? <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotEditStyle}/>
                            : <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>}

                        {/*строка типа пары*/}
                        {isActive ?
                            <select className="class-type editing"
                                    value={newClassType}
                                    onChange={handleClassTypeChange}
                                    id="class-type-dropdown">
                                <option value="0">Лекция</option>
                                <option value="1">Практика</option>
                                <option value="2">Лаб. работа</option>
                            </select>
                            : (isEditing ?
                                    <div className="class-type">{(
                                        parseInt(newClassType) === 0 ? "Лекция" :
                                            parseInt(newClassType) === 1 ? "Практика" :
                                                parseInt(newClassType) === 2 ? "Лаб. работа" : "Ошибка")}
                                    </div> :
                                    <div className="class-type">{(
                                        classType === 0 ? "Лекция" :
                                            classType === 1 ? "Практика" :
                                                classType === 2 ? "Лаб. работа" : "Ошибка")}
                                    </div>
                            )}

                        {(weekType === 0 && subgroup === 0 ? null :
                            (isActive ? <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotEditStyle}/>
                                : <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>))}

                        {isActive && (subgroup === 0 && weekType === 0) ?
                            <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotEditStyle}/>
                            : null}

                        {/*строка типа недели*/}
                        {isActive ? (
                            <div className={isWeekTypeEditing ? "week-type-icon editing" : "week-type-icon"}
                                 onClick={handleWeekTypeChange}>
                                {(weekType === 0 ? null :
                                    weekType === 1 ? (windowWidth <= 930 ?
                                            <OddWeekIconSmall style={signSmallStyle}/> :
                                            <OddWeekIcon style={signStyleNp}/>
                                    ) : weekType === 2 ? (windowWidth <= 930 ?
                                            <EvenWeekIconSmall style={signSmallStyle}/> :
                                            <EvenWeekIcon style={signStyleNp}/>
                                    ) : null)}

                                {weekType === 0 && subgroup === 0 ? <EmptyIcon/> : null}

                                {(subgroup !== 0 && weekType === 0) || (subgroup === 0 && weekType !== 0) || (subgroup === 0 && weekType === 0) ?
                                    null : <div style={{margin: "0 15px 0 0"}}/>}

                                {(subgroup === 0 ? null :
                                    subgroup === 1 ? (windowWidth <= 930 ?
                                            <FirstSGSmall style={lastSignSmallStyle}/> :
                                            <FirstSG style={lastSignStyleNp}/>
                                    ) : subgroup === 2 ? (windowWidth <= 930 ?
                                            <SecondSGSmall style={lastSignSmallStyle}/> :
                                            <SecondSG style={lastSignStyleNp}/>
                                    ) : null)}
                            </div>
                        ) : (
                            <>
                                {(weekType === 0 ? null :
                                    weekType === 1 ? (windowWidth <= 930 ?
                                            <OddWeekIconSmall style={signSmallStyle}/> :
                                            <OddWeekIcon style={signStyle}/>
                                    ) : weekType === 2 ? (windowWidth <= 930 ?
                                            <EvenWeekIconSmall style={signSmallStyle}/> :
                                            <EvenWeekIcon style={signStyle}/>
                                    ) : null)}
                                {(subgroup === 0 ? null :
                                    subgroup === 1 ? (windowWidth <= 930 ?
                                            <FirstSGSmall style={lastSignSmallStyle}/> :
                                            <FirstSG style={lastSignStyle}/>
                                    ) : subgroup === 2 ? (windowWidth <= 930 ?
                                            <SecondSGSmall style={lastSignSmallStyle}/> :
                                            <SecondSG style={lastSignStyle}/>
                                    ) : null)}
                            </>
                        )}
                    </div>
                    <div className={isActive ? "info-row editing" : "info-row"}>
                        {/*строка названия*/}
                        {isActive ? <input className="class-name editing"
                                           id="class-name-input"
                                           value={newClassName}
                                           onChange={handleClassNameChange}
                        ></input> : (isEditing ? <div className="class-name">{newClassName}</div> :
                            <div className="class-name">{className}</div>)}
                    </div>
                    <div className={isActive ? "info-row editing" : "info-row"}>
                        {/*строка преподавателя*/}
                        {isActive ? <input className="class-teacher editing"
                                           id="class-teacher-input"
                                           value={newTeacher}
                                           onChange={handleTeacherChange}
                        ></input> : (isEditing ? <div className="class-teacher">{newTeacher}</div> :
                            <div className="class-teacher">{teacher}</div>)}
                    </div>
                </div>
                <aside className="location-info">
                    {/*строка типа локации*/}
                    {isActive ?
                        <select value={newLocationType}
                                onChange={handleLocationTypeChange}
                                className="location-type editing"
                                id="location-type-dropdown">
                            <option value="0">Очно</option>
                            <option value="1">Дистант</option>
                        </select>
                        :
                        (isEditing ? <div className="location-type">
                                {(parseInt(newLocationType) === 0 ? "Очно" : "Дистант")}
                            </div>
                            :
                            <div className="location-type">
                                {(locationTypeSc === 0 ? "Очно" : "Дистант")}
                            </div>)
                    }

                    {/*строка локации*/}
                    <div>
                        {((locationTypeSc === 0 || parseInt(newLocationType) === 0) &&
                                (containsLetters(classroom) || containsLetters(newLocation)))
                            && parseInt(newLocationType) !== 1 &&
                            (isActive ? <input className="irl-letters-location editing"
                                               id="classroom-input"
                                               value={newLocation}
                                               onChange={handleLocationChange}>
                                </input> :
                                (isEditing ? <div className="irl-letters-location">{newLocation}</div> :
                                    <div className="irl-letters-location">{classroom}</div>))
                        }
                        {((locationTypeSc === 0 || parseInt(newLocationType) === 0) &&
                                !(containsLetters(classroom) || containsLetters(newLocation)))
                            && parseInt(newLocationType) !== 1 &&
                            (isActive ? <input className="irl-location editing"
                                               id="classroom-input"
                                               value={newLocation}
                                               onChange={handleLocationChange}>
                                </input> :
                                (isEditing ? <div className="irl-location">{newLocation}</div> :
                                    <div className="irl-location">{classroom}</div>))
                        }
                        {(locationTypeSc === 1 || parseInt(newLocationType) === 1)
                            && parseInt(newLocationType) !== 0 &&
                            (isActive ? <input className="distant-location editing"
                                               id="classroom-input"
                                               value={newLink}
                                               onChange={handleLinkChange}>
                                </input> :
                                (isEditing ?
                                    <a href={newLink}
                                       target="_blank"
                                       rel="noreferrer"
                                       className="distant-location">
                                        Ссылка
                                    </a> :
                                    <a href={link}
                                       target="_blank"
                                       rel="noreferrer"
                                       className="distant-location">
                                        Ссылка
                                    </a>))
                        }
                    </div>
                </aside>
                {isActive ?
                    <div className="delete-button" onClick={handleClassDelete}>
                        <DeleteIcon/>
                    </div> : null}
            </section>
            {
                isActive ? <div className="class-edit-panel-container">
                    <TeacherPickPanel
                        handleTeacherAdd={handleTeacherAdd}
                        handleTeacherPick={handleTeacherPick}
                        handleTeacherSave={handleTeacherSave}
                        isAddingTeachers={isAddingTeachers}
                        handleTeacherNameChange={handleTeacherNameChange}
                        newTeacherName={newTeacherName}
                        isActive={isActive}
                    />
                    <LocationPickPanel
                        handleLocationAdd={handleLocationAdd}
                        handleLocationPick={handleLocationPick}
                        handleLocationSave={handleLocationSave}
                        isAddingLocation={isAddingLocation}
                        newLocationType={newLocationTypeInfo}
                        newLocation={newLocationInfo}
                        handleLocationTypeChange={handleLocationTypeChange}
                        handleLocationChange={handleLocationChange}
                        isActive={isActive}/>
                </div> : null
            }

        </div>)
}

export default Class;
