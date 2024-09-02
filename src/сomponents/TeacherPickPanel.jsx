import {useState, useRef, useEffect} from 'react';
import "../index.css";
import AddIcon from "../assets/addInfoIcon.svg?react"
import MoveRightIcon from "../assets/moveRightIcon.svg?react"
import MoveLeftIcon from "../assets/moveLeftIcon.svg?react"
import {GET_REQUEST_OPTIONS_WITH_AUTH, useMaxScrollPosition} from "../common";

const TeacherPickPanel = ({
                              handleTeacherPick, handleTeacherAdd, isAddingTeachers, handleTeacherSave,
                              handleTeacherNameChange, newTeacherName, isActive, isFilterActive, filter
                          }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [teachers, setTeachers] = useState([])
    const [refreshElement, setRefreshElement] = useState(0);
    const contentRef = useRef(null);
    const containerRef = useRef(null);
    const maxScrollPosition = useMaxScrollPosition(containerRef, contentRef);
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    useEffect(() => {
        let filteredTeachers = teachers;
        if (filter && isFilterActive) {
            filteredTeachers = filteredTeachers.filter(teacher => teacher.fullName?.toLowerCase().includes(filter.toLowerCase()));
        }

        setFilteredTeachers(filteredTeachers);
    }, [filter, isFilterActive, teachers]);

    const internalHandleTeacherSave = () => {
        handleTeacherSave();
        setTimeout(() => {
            refreshComponent();
        }, 200);

    }

    const handleScroll = (direction) => {
        const step = 300;
        let newPosition = scrollPosition + (direction === 'left' ? step : -step);

        newPosition = Math.max(0, Math.min(newPosition, maxScrollPosition));

        setScrollPosition(newPosition);
    };

    useEffect(() => {
        setScrollPosition(0);
    }, [isFilterActive]);

    const refreshComponent = () => {
        setRefreshElement(refreshElement + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/teachers", GET_REQUEST_OPTIONS_WITH_AUTH);
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных: ', error);
                setTeachers([]);
            }
        }
        fetchData();
    }, [isActive, isAddingTeachers, refreshElement])

    return (
        <div className="class-edit-main-container teacher">
            <div className="class-edit-inner-container first">
                <div className="class-edit-main-text">Преподаватель:</div>
                <button className="class-edit-new-option" onClick={handleTeacherAdd}><AddIcon/></button>
                <div className="scroll-container"
                     ref={containerRef}
                     id="myContainer"
                     style={{overflow: 'hidden'}}>

                    <div ref={contentRef} style={{
                        transform: `translateX(-${scrollPosition}px)`,
                        transition: 'transform 0.3s ease',
                        whiteSpace: 'nowrap',
                        position: "relative",
                    }}>
                        {filteredTeachers.map((item) => (
                            <div key={item.id} data-id={item.id} onClick={() => handleTeacherPick(item)}
                                 className="class-edit-option">
                                {item.fullName}
                            </div>
                        ))}
                        {scrollPosition < maxScrollPosition ? <button onClick={() => handleScroll('left')}
                                                                      style={{
                                                                          position: "absolute",
                                                                          left: "373px",
                                                                          top: "0px",
                                                                          cursor: "pointer",
                                                                          transition: 'transform 0.3s ease',
                                                                          transform: `translateX(${scrollPosition}px)`,
                                                                          background: "none",
                                                                          border: "none",
                                                                          padding: "0px"
                                                                      }}>
                            <MoveRightIcon/>
                        </button> : null}
                        {scrollPosition > 0 ? <button onClick={() => handleScroll('right')}
                                                      style={{
                                                          position: "absolute", left: "0px", top: "0px",
                                                          cursor: "pointer", transition: 'transform 0.3s ease',
                                                          transform: `translateX(${scrollPosition}px)`,
                                                          background: "none",
                                                          border: "none",
                                                          padding: "0px"
                                                      }}>
                            <MoveLeftIcon/>
                        </button> : null}
                    </div>
                </div>
            </div>

            {isAddingTeachers ?
                <div className="class-edit-inner-container second">
                    <div className="class-edit-panel-new-container">
                        <div className="class-edit-secondary-text">ФИО преподавателя:</div>
                        <input className="class-edit-input" id="teacher-edit-input" value={newTeacherName}
                               onChange={handleTeacherNameChange}></input>
                        <button className="edit-panel-save-button" onClick={internalHandleTeacherSave}>Добавить</button>
                    </div>
                </div>
                : null}
        </div>)
};
export default TeacherPickPanel;