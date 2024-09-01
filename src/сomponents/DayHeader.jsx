import {useContext, useEffect, useState} from 'react';
import "../index.css";
import DotDivider from "../assets/dot.svg?react";
import EditIcon from "../assets/edit.svg?react";
import ExitIcon from "../assets/stopEdit.svg?react";
import EraseIcon from "../assets/eraser.svg?react";
import CopyIcon from "../assets/copy.svg?react";
import {GET_REQUEST_OPTIONS_WITH_AUTH, PUT_REQUEST_OPTIONS_WITH_AUTH, useWindowWidth} from "../common";
import AuthContext from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const DayHeader = ({
                       name,
                       classCount,
                       isToday,
                       editing,
                       isEditing,
                       placeholder,
                       clearNewClassesList,
                       clearAllClasses,
                       dayData,
                       weekInfo
                   }) => {
    const dotStyle = {
        height: "5px",
        width: "5px",
        paddingLeft: "15px",
        paddingRight: "15px"
    };

    const dotSmallStyle = {
        height: "2.5px",
        width: "2.5px",
        paddingLeft: "9px",
        paddingRight: "9px",
    };

    const {editPermissions, allowedGroup} = useContext(AuthContext);
    const windowWidth = useWindowWidth();
    const [oppositeWeekType, setOppositeWeekType] = useState(undefined);
    const [oppositeSubgroup, setOppositeSubgroup] = useState(undefined);
    const [oppositeWeek, setOppositeWeek] = useState([]);
    const [isStatesUpdated, setIsStatesUpdated] = useState(false);

    const handleEditing = () => {
        if (!isEditing) {
            setTimeout(() => {
                const icon = document.querySelector('.add-icon');
                icon?.classList.add('appear');
            }, 200);
        } else {
            const icon = document.querySelector('.add-icon');
            icon?.classList.remove('appear');
            placeholder(false);
            clearNewClassesList();
        }

        editing(!isEditing);
    };

    const handleClassesClear = () => {
        clearAllClasses();
    }

    const handleClassCopy = async () => {
        const newOppositeWeekType = weekInfo.info.type === 1 ? 2 : 1;
        let newOppositeSubgroup = weekInfo.info.subgroup === 1 ? 2 : weekInfo.info.subgroup === 2 ? 1 : 0;

        if (weekInfo.group.hasSubgroups === false)
            newOppositeSubgroup = 0;

        setOppositeWeekType(newOppositeWeekType);
        setOppositeSubgroup(newOppositeSubgroup);
        setIsStatesUpdated(!isStatesUpdated);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 =
                    await fetch(`https://localhost:7184/api/weeks?WeekType=${oppositeWeekType}&GroupId=${weekInfo.group.id}&Subgroup=${oppositeSubgroup}&fetchDetails=true`,
                        GET_REQUEST_OPTIONS_WITH_AUTH);
                const data1 = await response1.json();
                setOppositeWeek(Object.values(data1));
            } catch (error) {
                console.error('Error fetching week data:', error);
            }
        };

        if (oppositeWeekType !== undefined && oppositeSubgroup !== undefined) {
            fetchData();
        }
    }, [isStatesUpdated]);

    useEffect(() => {
        const copyDayData = async () => {
            if (oppositeWeek.length === 0 || !dayData) return;

            console.log(oppositeWeek);
            try {
                const dayToCopyTo = oppositeWeek.find(w => w.dayInfo && dayData.dayInfo && w.dayInfo.name === dayData.dayInfo.name);

                if (dayToCopyTo) {
                    const dayToCopyToId = dayToCopyTo.dayInfo.id;

                    const response2 =
                        await fetch(`https://localhost:7184/api/days/copy?dayToCopyFromId=${dayData.dayInfo.id}&dayToCopyToId=${dayToCopyToId}`, PUT_REQUEST_OPTIONS_WITH_AUTH);

                    if (response2.status === 204 || response2.status === 200) {
                        toast.success('День успешно скопирован.');
                    } else {
                        throw new Error('Request was not successful');
                    }
                } else {
                    throw new Error('Matching day not found in opposite week data');
                }
            } catch (error) {
                console.error('Error copying day data:', error);
                toast.error('Не удалось скопировать день.');
            }
        };

        copyDayData();
    }, [oppositeWeek, dayData]);

    function num_word(value, words) {
        value = Math.abs(value) % 100;
        let num = value % 10;
        if (value > 10 && value < 20) return words[2];
        if (num > 1 && num < 5) return words[1];
        if (num === 1) return words[0];
        return words[2];
    }

    let classesText = num_word(classCount, ['пара', 'пары', 'пар']);

    return (
        <div className="day-header">
            <div className="day-header-text" style={isToday ? {textDecoration: "underline"} : null}>{name}</div>
            <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>
            <div className="classes-text">{classCount === 0 ? "выходной" : classCount + " " + classesText}</div>
            {windowWidth <= 930 ? null :
                (editPermissions && allowedGroup && weekInfo && (allowedGroup === weekInfo.group.id.toString() || allowedGroup === "all") ?
                    <div style={{order: 9, marginLeft: "auto"}}>
                        {isEditing && <button onClick={handleClassCopy}
                                              className="copy-icon-wrapper"
                                              title="Скопировать пары с этого дня на противоположную неделю">
                            <CopyIcon/>
                        </button>}
                        {isEditing && <button onClick={handleClassesClear}
                                              className="erase-icon-wrapper"
                                              title="Очистить день от пар">
                            <EraseIcon/>
                        </button>}
                        <button onClick={handleEditing}
                                className={isEditing ? "edit-icon-wrapper editing" : "edit-icon-wrapper"}
                                title={isEditing ? "Выйти из режима редактирования" : "Редактировать день"}>
                            {isEditing ? <ExitIcon style={{paddingLeft: "2px"}}/> :
                                <EditIcon className="edit-icon"/>}
                        </button>

                    </div> : null)}
        </div>
    );
};

export default DayHeader;
