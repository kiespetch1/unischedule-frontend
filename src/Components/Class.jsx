import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import "../index.css";
import {ReactComponent as EvenWeekIcon} from "../assets/evenWeek.svg";
import {ReactComponent as EvenWeekIconSmall} from "../assets/evenWeekSmall.svg";
import {ReactComponent as OddWeekIcon} from "../assets/oddWeek.svg";
import {ReactComponent as OddWeekIconSmall} from "../assets/oddWeekSmall.svg";
import {ReactComponent as DotDivider} from "../assets/blackDot.svg";
import {ReactComponent as FirstSG} from "../assets/1sg.svg";
import {ReactComponent as FirstSGSmall} from "../assets/1sgSmall.svg";
import {ReactComponent as SecondSG} from "../assets/2sg.svg";
import {ReactComponent as SecondSGSmall} from "../assets/2sgSmall.svg";
import {ReactComponent as EmptyIcon} from "../assets/emptyWeekTypeIcon.svg";
import LocationPickPanel from "./LocationPickPanel";
import TeacherPickPanel from "./TeacherPickPanel";
import {ReactComponent as DeleteIcon} from "../assets/delete.svg";
import ClassPropertiesPopup from "./ClassPropertiesPopup";

export const EvenWeekIconWithTitle = (props) => (
    <EvenWeekIcon title="Четная неделя" {...props} />
);

export const EvenWeekIconSmallWithTitle = (props) => (
    <EvenWeekIconSmall title="Четная неделя" {...props} />
);

export const OddWeekIconWithTitle = (props) => (
    <OddWeekIcon title="Нечетная неделя" {...props} />
);

export const OddWeekIconSmallWithTitle = (props) => (
    <OddWeekIconSmall title="Нечетная неделя" {...props} />
);

export const FirstSGWithTitle = (props) => (
    <FirstSG title="Первая подгруппа" {...props} />
);

export const FirstSGSmallWithTitle = (props) => (
    <FirstSGSmall title="Первая подгруппа" {...props} />
);

export const SecondSGWithTitle = (props) => (
    <SecondSG title="Вторая подгруппа" {...props} />
);

export const SecondSGSmallWithTitle = (props) => (
    <SecondSGSmall title="Вторая подгруппа" {...props} />
);

const Class = forwardRef(({
                              order,
                              dayData,
                              isEditing,
                              isActive,
                              onClick,
                              onActiveChange,
                              isNew,
                              handleNewClassDelete,
                              decreaseClassesCount
                          }, ref) => {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [isAddingTeachers, setIsAddingTeachers] = useState(false);
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    const [isWeekTypeEditing, setIsWeekTypeEditing] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false); //флаг для определения отправлена ли новая пара на сервер
    const [forceSave, setForceSave] = useState(false); //флаг для сохранения активной пары по нажатия на кнопку сохранения
    const [isDeleted, setIsDeleted] = useState(false);

    const [newClassStartTime, setNewClassStartTime] = useState(''); //новое время начала пары
    const [newClassEndTime, setNewClassEndTime] = useState(''); //новое время окончания пары
    const [newClassType, setNewClassType] = useState(''); //новый тип пары
    const [newWeekType, setNewWeekType] = useState(0); //новый тип недели
    const [newSubgroup, setNewSubgroup] = useState(0); //новая подгруппа
    const [newLocationType, setNewLocationType] = useState('0'); //новый тип локации
    const [newLocationId, setNewLocationId] = useState(''); //айди измененной локации
    const [newLocationInfo, setNewLocationInfo] = useState(''); //данные о локации, будь то аудитория или ссылка
    const [newClassName, setNewClassName] = useState(''); //новое имя пары
    const [newTeacher, setNewTeacher] = useState(''); //новое имя учителя
    const [newTeacherId, setNewTeacherId] = useState(''); //айди измененного учителя
    const [newTeacherName, setNewTeacherName] = useState(''); //имя для создания учителя
    const [teacherFilter, setTeacherFilter] = useState(''); //фильтр учителей, он же служит отображаемым именем
    const [isTeacherFilterActive, setIsTeacherFilterActive] = useState(false); //флаг для понимания, когда мы фильтруем учителей, а когда нет
    const [locationFilter, setLocationFilter] = useState(''); //фильтр локаций, он же служит отображаемым именем
    const [isLocationFilterActive, setIsLocationFilterActive] = useState(false); //флаг для понимания, когда мы фильтруем локации, а когда нет
    const [isWindow, setIsWindow] = useState(false);
    const popupRef = useRef(null); //реф всплывающего окна свойств пары для закрытия по клику вне его зоны

    const dotStyle = {
        flexGrow: "1",
        height: "5px",
        width: "5px",
        paddingLeft: "15px",
        paddingRight: "15px",
    }; //TODO как то бы организовать все эти стили поудобнее для всех файлов

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
        },
        credentials: 'include'
    };

    const deleteRequestOptions = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    const putRequestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    function containsLetters(str) {
        return /[a-zA-Zа-яА-Я]/.test(str);
    }

    const isTimeInputValid = (input) => {
        return /^[0-9:]*$/.test(input);
    };

    const handleTeacherAdd = () => {
        setIsAddingTeachers(!isAddingTeachers);
    };

    const handleTeacherNameChange = (event) => {
        setNewTeacherName(event.target.value);
    };


    const handleTeacherSave = () => {
        if (newTeacherName !== '') {
            let name = newTeacherName.trim();
            fetch("https://localhost:7184/api/teachers?fullName=" + name, postRequestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                })
                .catch(error => {
                    console.log("Ошибка при отправке данных: " + error);
                });
        }
        setIsAddingTeachers(false);
    };

    const handleLocationAdd = () => {
        setIsAddingLocation(!isAddingLocation);
    };

    const handleLocationSave = () => {
        if (newLocationInfo !== '' && newLocationType !== '') {
            let locationInfo = newLocationInfo.trim();
            let typeQuery;
            let locationQuery;
            if (parseInt(newLocationType) === 0) {
                typeQuery = "locationType=0";
                locationQuery = "&classroom=" + locationInfo;
            } else if (parseInt(newLocationType) === 1) {
                typeQuery = "locationType=1";
                locationQuery = "&link=" + locationInfo;
            } else {
                console.log("Unknown location type: " + newLocationType);
            }

            fetch("https://localhost:7184/api/locations?" + typeQuery + locationQuery, postRequestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                })
                .catch(error => {
                    console.log("Ошибка при отправке данных: " + error);
                });
        }

        setIsAddingLocation(false);
    };

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

    const handleClassPropertiesChange = () => {
        setIsWeekTypeEditing(!isWeekTypeEditing);
    };

    const handleWeekTypeChange = (event) => {
        const input = parseInt(event.target.value);
        setNewWeekType(input);
    };

    const handleSubgroupChange = (event) => {
        const input = parseInt(event.target.value);
        setNewSubgroup(input);
    };

    const handleLocationTypeChange = (event) => {
        const input = event.target.value;
        setNewLocationType(input);
    };

    const handleLocationChange = (event) => {
        const input = event.target.value;
        setNewLocationInfo(input);
    };

    const handleClassNameChange = (event) => {
        const input = event.target.value;
        setNewClassName(input);
    };

    const handleLocationPick = (locationType, nameOrLink, id) => {
        setIsLocationFilterActive(false)
        setNewLocationType(locationType);
        setNewLocationInfo(nameOrLink);
        setNewLocationId(id);
        setLocationFilter(nameOrLink)
    };

    const handleTeacherPick = (item) => {
        setIsTeacherFilterActive(false);
        setNewTeacher(item.fullName);
        setNewTeacherId(item.id);
        setTeacherFilter(item.fullName);
    };

    const handleTeacherFilterChange = (event) => {
        setTeacherFilter(event.target.value);
        setIsTeacherFilterActive(true);
    };

    const handleLocationFilterChange = (event) => {
        setLocationFilter(event.target.value);
        setIsLocationFilterActive(true);
    }

    useImperativeHandle(ref, () => ({
        forceSaveClass() {
            setForceSave(true);
        }
    }));

    const handleClassDelete = () => {
        if (isNew && !isSubmited) {
            handleNewClassDelete(order);
        } else {
            if (isNew && isSubmited) {
                classId = newAddedIdRef.current
            }
            fetch("https://localhost:7184/api/classes/" + classId, deleteRequestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                })
                .catch(error => {
                    console.log("Ошибка при отправке данных: " + error);
                });
        }
        setIsDeleted(true);
        decreaseClassesCount();
    };

    let dayId = isNew ? dayData.id : dayData.dayInfo?.id;
    let classId = isNew ? null : dayData?.classes[order - 1]?.id;
    let classStartTime;
    let classEndTime;
    let classType;
    let weekType;
    let subgroup;
    let className;
    let teacher;
    let locationTypeSc;
    let classroom;
    let link;

    let teacherId = isNew ? null : dayData?.classes[order - 1].teacherId;
    let locationId = isNew ? null : dayData?.classes[order - 1]?.locationId;

    if (isNew) {
        classStartTime = "9:00";
        classEndTime = "10:35";
        classType = 0;
        weekType = 0;
        subgroup = 0;
        className = "Новая пара";
        teacher = {id: "0", fullName: "Новый преподаватель"};
        locationTypeSc = 0;
        classroom = "Новая локация";
        link = "Новая ссылка";
    } else {
        classStartTime = dayData.classes[order - 1].startTime.slice(0, 5);
        classEndTime = dayData.classes[order - 1].endTime.slice(0, 5);
        classType = dayData.classes[order - 1].type;
        weekType = dayData.classes[order - 1].weekType;
        subgroup = dayData.classes[order - 1].subgroup;
        className = dayData.classes[order - 1].name;
        teacher = dayData.teachers.find(teacher => teacher.id === dayData.classes[order - 1].teacherId);
        locationTypeSc = dayData.locations.find(location => location.id === locationId).locationType;
        classroom = dayData.locations.find(location => location.id === locationId).classroom;
        link = dayData.locations.find(location => location.id === locationId).link;
    }

    const newAddedIdRef = useRef(classId); //реф айди сабмитнутой новой пары

    useEffect(() => {
        const handleResize = () => { //вроде как хук для изменения размера окна
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => { //инициализация начальных значений для редактирования пары
        setNewClassStartTime(classStartTime);
        setNewClassEndTime(classEndTime);
        setNewClassType(classType);
        setNewLocationType(locationTypeSc);
        setNewLocationInfo(locationTypeSc === 0 ? classroom : locationTypeSc === 1 ? link : null);
        setNewLocationId(locationId);
        setNewClassName(className);
        setNewTeacher(teacher.fullName);
        setNewTeacherId(teacherId);
        setNewWeekType(weekType);
        setNewSubgroup(subgroup);
        setIsWindow(false);
        setTeacherFilter(teacher.fullName);
        setLocationFilter(locationTypeSc === 0 ? classroom : locationTypeSc === 1 ? link : null);
        setIsLocationFilterActive(false);
        setIsTeacherFilterActive(false);
    }, [isEditing]); // eslint-disable-line react-hooks/exhaustive-deps
                            //мб тут все таки надо добавить все в зависимости, но через иф сделать чтобы выполнялось только при изменении isEditing

    useEffect(() => {
        if (!isEditing) {
            onActiveChange(false);
        }
    }, [isEditing, onActiveChange]);

    const prevIsActive = useRef();

    //сохранение изменений в паре на сервер при переключении активной пары
    useEffect(() => {
        function generateParams(params) {
            return Object.keys(params)
                .filter(key => params[key].value !== params[key].original)
                .map(key => `${key}=${encodeURIComponent(params[key].value)}`)
                .join('&');
        }

        if (prevIsActive.current && !isActive) {
            const params = {
                Name: {original: className, value: newClassName},
                Type: {original: classType, value: newClassType},
                TeacherId: {original: teacherId, value: newTeacherId},
                StartTime: {original: classStartTime, value: newClassStartTime},
                EndTime: {original: classEndTime, value: newClassEndTime},
                WeekType: {original: weekType, value: newWeekType},
                LocationId: {original: locationId, value: newLocationId},
                Subgroup: {original: subgroup, value: newSubgroup}
            };

            let paramString;

            if (isNew && !isSubmited) {
                paramString = Object.keys(params)
                    .map(key => `${key}=${encodeURIComponent(params[key].value)}`)
                    .join('&');
            } else {
                paramString = generateParams(params);
            }

            if (paramString) {
                let url;
                if (isNew && !isSubmited) {
                    url = "https://localhost:7184/api/days";
                } else {
                    if (isNew && isSubmited) {
                        classId = newAddedIdRef.current;
                    }
                    url = `https://localhost:7184/api/classes/${classId}`;
                }

                let firstParam = true;
                if (isWindow !== undefined && isNew) {
                    url += "?dayId=" + dayId + "&isWindow=" + encodeURIComponent(isWindow);
                    firstParam = false;
                }

                if (paramString) {
                    url += (firstParam ? '?' : '&') + paramString;
                }

                if ((isEditing && !isActive) || (forceSave && !isDeleted)) {
                    console.log(`Final URL: ${url}`);
                    fetch(url, putRequestOptions)
                        .then(response => {
                            if (response.status === 204 || response.status === 200) {
                                console.log('Request was successful, but no content returned.');
                                return response.json();
                            } else {
                                console.log('Статус ответа не 200 и не 204');
                                throw new Error('Статус ответа не 200 и не 204');
                            }
                            })
                        .then(data => {
                            let numbers = data.classesId;
                            newAddedIdRef.current = Math.max(...numbers);
                        })
                        .catch(error => {
                            console.error('Ошибка при выполнении запроса:', error);
                        });


                    if (isNew && !isSubmited) {
                        setIsSubmited(true);
                    }

                    if (forceSave) {
                        setForceSave(false);
                    }
                }
            }
        }
        prevIsActive.current = isActive;
    }, [
        classEndTime,
        classId,
        className,
        classStartTime,
        classType,
        dayId,
        isActive,
        isEditing,
        isNew,
        isSubmited,
        isWindow,
        locationId,
        newClassEndTime,
        newClassName,
        newClassStartTime,
        newClassType,
        newLocationId,
        newSubgroup,
        newTeacherId,
        newWeekType,
        putRequestOptions,
        subgroup,
        teacherId,
        weekType,
        forceSave
    ]);

    useEffect(() => { //для закрытия окна по клику вне его зоны
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsWeekTypeEditing(false);
            }
        };

        if (isWeekTypeEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isWeekTypeEditing]);

    if (isDeleted)
        return null;
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

                        {/*добавляет точку между типом пары и свойствами пары (неделя, подгруппа) если есть какие то свойства*/}
                        {(weekType === 0 && subgroup === 0 ? null :
                            (isActive ? <DotDivider style={dotEditStyle}/>
                                : <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>))}

                        {/*добавляет точку между типом пары и свойствами пары (неделя, подгруппа) если пара активна*/}
                        {isActive && (subgroup === 0 && weekType === 0) ?
                            <DotDivider style={dotEditStyle}/>
                            : null}

                        {/*добавляет точку между типом пары и свойствами пары (неделя, подгруппа) если есть какие то свойства, но пара не активна*/}
                        {isEditing && !isActive && !(newSubgroup === 0 && newWeekType === 0) && (weekType === 0 && subgroup === 0) ?
                            <DotDivider style={dotStyle}/> : null}

                        {/*строка типа недели*/}
                        {isActive ? (
                            <div className={isWeekTypeEditing ? "week-type-icon editing" : "week-type-icon"}
                                 onClick={handleClassPropertiesChange}>
                                {(newWeekType === 0 ? null :
                                    newWeekType === 1 ? (windowWidth <= 930 ?
                                            <OddWeekIconSmallWithTitle style={signSmallStyle}/> :
                                            <OddWeekIconWithTitle style={signStyleNp}/>
                                    ) : newWeekType === 2 ? (windowWidth <= 930 ?
                                            <EvenWeekIconSmallWithTitle style={signSmallStyle}/> :
                                            <EvenWeekIconWithTitle style={signStyleNp}/>
                                    ) : null)}

                                {newWeekType === 0 && newSubgroup === 0 ? <EmptyIcon/> : null}

                                {(newSubgroup !== 0 && newWeekType === 0) || (newSubgroup === 0 && newWeekType !== 0) || (newSubgroup === 0 && newWeekType === 0) ?
                                    null : <div style={{margin: "0 15px 0 0"}}/>}

                                {(newSubgroup === 0 ? null :
                                    newSubgroup === 1 ? (windowWidth <= 930 ?
                                            <FirstSGSmallWithTitle style={lastSignSmallStyle}/> :
                                            <FirstSGWithTitle style={lastSignStyleNp}/>
                                    ) : newSubgroup === 2 ? (windowWidth <= 930 ?
                                            <SecondSGSmallWithTitle style={lastSignSmallStyle}/> :
                                            <SecondSGWithTitle style={lastSignStyleNp}/>
                                    ) : null)}
                            </div>
                        ) : (isEditing ? <>
                                    {(newWeekType === 0 ? null :
                                        newWeekType === 1 ? (windowWidth <= 930 ?
                                                <OddWeekIconSmallWithTitle style={signSmallStyle}/> :
                                                <OddWeekIconWithTitle style={signStyle}/>
                                        ) : newWeekType === 2 ? (windowWidth <= 930 ?
                                                <EvenWeekIconSmallWithTitle style={signSmallStyle}/> :
                                                <EvenWeekIconWithTitle style={signStyle}/>
                                        ) : null)}
                                    {(newSubgroup === 0 ? null :
                                        newSubgroup === 1 ? (windowWidth <= 930 ?
                                                <FirstSGSmallWithTitle style={lastSignSmallStyle}/> :
                                                <FirstSGWithTitle style={lastSignStyle}/>
                                        ) : newSubgroup === 2 ? (windowWidth <= 930 ?
                                                <SecondSGSmallWithTitle style={lastSignSmallStyle}/> :
                                                <SecondSGWithTitle style={lastSignStyle}/>
                                        ) : null)}
                                </>
                                :
                                <>
                                    {(weekType === 0 ? null :
                                        weekType === 1 ? (windowWidth <= 930 ?
                                                <OddWeekIconSmallWithTitle style={signSmallStyle}/> :
                                                <OddWeekIconWithTitle style={signStyle}/>
                                        ) : weekType === 2 ? (windowWidth <= 930 ?
                                                <EvenWeekIconSmallWithTitle style={signSmallStyle}/> :
                                                <EvenWeekIconWithTitle style={signStyle}/>
                                        ) : null)}
                                    {(subgroup === 0 ? null :
                                        subgroup === 1 ? (windowWidth <= 930 ?
                                                <FirstSGSmallWithTitle style={lastSignSmallStyle}/> :
                                                <FirstSGWithTitle style={lastSignStyle}/>
                                        ) : subgroup === 2 ? (windowWidth <= 930 ?
                                                <SecondSGSmallWithTitle style={lastSignSmallStyle}/> :
                                                <SecondSGWithTitle style={lastSignStyle}/> //этому дерьму нужен рефакторинг
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
                                           value={teacherFilter}
                                           onChange={handleTeacherFilterChange}
                        ></input> : (isEditing ? <div className="class-teacher">{teacherFilter}</div> :
                            <div className="class-teacher">{teacher.fullName}</div>)}
                    </div>
                </div>
                <aside className="location-info">
                    {/*строка типа локации*/}
                    {isActive ?
                        <input value={newLocationType == 0 ? "Очно" : newLocationType == 1 ? "Дистант" : "Ошибка"}
                               className="location-type editing"
                               id="location-type-dropdown"
                               readOnly>
                        </input>
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
                                (containsLetters(classroom) || containsLetters(newLocationInfo)))
                            && parseInt(newLocationType) !== 1 &&
                            (isActive ? <input className="irl-letters-location editing"
                                               id="classroom-input"
                                               value={locationFilter}
                                               onChange={handleLocationFilterChange}>
                                </input> :
                                (isEditing ? <div className="irl-letters-location">{locationFilter}</div> :
                                    <div className="irl-letters-location">{classroom}</div>))
                        }
                        {((locationTypeSc === 0 || parseInt(newLocationType) === 0) &&
                                !(containsLetters(classroom) || containsLetters(newLocationInfo)))
                            && parseInt(newLocationType) !== 1 &&
                            (isActive ? <input className="irl-location editing"
                                               id="classroom-input"
                                               value={locationFilter}
                                               onChange={handleLocationFilterChange}>
                                </input> :
                                (isEditing ? <div className="irl-location">{locationFilter}</div> :
                                    <div className="irl-location">{classroom}</div>))
                        }
                        {(locationTypeSc === 1 || parseInt(newLocationType) === 1)
                            && parseInt(newLocationType) !== 0 &&
                            (isActive ? <input className="distant-location editing"
                                               id="classroom-input"
                                               value={locationFilter}
                                               onChange={handleLocationFilterChange}>
                                </input> :
                                (isEditing ?
                                    <a href={newLocationInfo}
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
                    <button className="delete-button" onClick={handleClassDelete}>
                        <DeleteIcon/>
                    </button> : null}

            </section>

            {isActive ? <div className="class-edit-panel-container">
                {isWeekTypeEditing && <ClassPropertiesPopup ref={popupRef}
                                                            newWeekType={newWeekType}
                                                            handleWeekTypeChange={handleWeekTypeChange}
                                                            newSubgroup={newSubgroup}
                                                            handleSubgroupChange={handleSubgroupChange}/>}
                {/*надо будет позиционировать исходя из позиции кнопки*/}
                <TeacherPickPanel
                    handleTeacherAdd={handleTeacherAdd}
                    handleTeacherPick={handleTeacherPick}
                    handleTeacherSave={handleTeacherSave}
                    isAddingTeachers={isAddingTeachers}
                    handleTeacherNameChange={handleTeacherNameChange}
                    newTeacherName={newTeacherName}
                    isActive={isActive}
                    isFilterActive={isTeacherFilterActive}
                    filter={teacherFilter}
                />
                <LocationPickPanel
                    handleLocationAdd={handleLocationAdd}
                    handleLocationPick={handleLocationPick}
                    handleLocationSave={handleLocationSave}
                    isAddingLocation={isAddingLocation}
                    newLocationType={newLocationType}
                    newLocation={newLocationInfo}
                    handleLocationTypeChange={handleLocationTypeChange}
                    handleLocationChange={handleLocationChange}
                    isActive={isActive}
                    isFilterActive={isLocationFilterActive}
                    filter={locationFilter}/>
            </div> : null}

        </div>
    );
});

export default Class;
