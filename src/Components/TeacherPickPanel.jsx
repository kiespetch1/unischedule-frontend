import React, {useState, useRef, useEffect} from 'react';
import "../index.css";
import {ReactComponent as AddIcon} from "../assets/addInfoIcon.svg"
import {ReactComponent as MoveRightIcon} from "../assets/moveRightIcon.svg"
import {ReactComponent as MoveLeftIcon} from "../assets/moveLeftIcon.svg"

const TeacherPickPanel = ({
                              handleTeacherPick, handleTeacherAdd, isAddingTeachers, handleTeacherSave,
                              handleTeacherNameChange, newTeacherName, isActive
                          }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScrollPosition, setMaxScrollPosition] = useState(0);
    const [teachers, setTeachers] = useState([]);
    const contentRef = useRef(null);
    const containerRef = useRef(null);


    useEffect(() => {
        const observedElement = containerRef.current;

        const updateMaxScroll = () => {
            if (observedElement) {
                const containerWidth = observedElement.offsetWidth;
                const contentWidth = contentRef.current.offsetWidth;
                const maxScroll = Math.max(0, contentWidth - containerWidth);
                setMaxScrollPosition(maxScroll + 20); //если какие то проблемы со скроллом, мб можно убрать 20
            }
        };

        updateMaxScroll();
        const resizeObserver = new ResizeObserver(() => {
            updateMaxScroll();
        });

        if (observedElement) {
            resizeObserver.observe(observedElement);
        }

        return () => {
            if (observedElement) {
                resizeObserver.unobserve(observedElement);
            }
        };
    }, []);

    const handleScroll = (direction) => {
        const step = 150;
        let newPosition = scrollPosition + (direction === 'left' ? step : -step);

        newPosition = Math.max(0, Math.min(newPosition, maxScrollPosition));

        setScrollPosition(newPosition);
    };

    useEffect(() => {
        const getRequestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7184/api/teachers", getRequestOptions);
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных: ', error);
                setTeachers([]);
            }
        }
        fetchData();
    },[isActive, isAddingTeachers])

    return (

        <div className="class-edit-main-container teacher">
            <div className="class-edit-inner-container first">
                <div className="class-edit-main-text">Преподаватель:</div>
                <div className="class-edit-new-option" onClick={handleTeacherAdd}><AddIcon/></div>
                <div className="scroll-container"
                     ref={containerRef}
                     id="myContainer"
                     style={{overflow: 'hidden', position: 'relative'}}>

                    <div ref={contentRef} style={{
                        transform: `translateX(-${scrollPosition}px)`,
                        transition: 'transform 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}>
                        {teachers.map((item) => (
                            <div key={item.id} onClick={() => handleTeacherPick(item.fullName)}
                                 className="class-edit-option">
                                {item.fullName}
                            </div>
                        ))}
                        {scrollPosition < maxScrollPosition ? <div onClick={() => handleScroll('left')}
                                                                   style={{
                                                                       position: "absolute",
                                                                       left: "373px",
                                                                       top: "0px",
                                                                       cursor: "pointer",
                                                                       transition: 'transform 0.3s ease',
                                                                       transform: `translateX(${scrollPosition}px)`
                                                                   }}>
                            <MoveRightIcon/>
                        </div> : null}
                        {scrollPosition > 0 ? <div onClick={() => handleScroll('right')}
                                                   style={{
                                                       position: "absolute", left: "0px", top: "0px",
                                                       cursor: "pointer", transition: 'transform 0.3s ease',
                                                       transform: `translateX(${scrollPosition}px)`
                                                   }}>
                            <MoveLeftIcon/>
                        </div> : null}
                    </div>
                </div>
            </div>

            {isAddingTeachers ?
                <div className="class-edit-inner-container second">
                    <div className="class-edit-panel-new-container">
                        <div className="class-edit-secondary-text">ФИО преподавателя:</div>
                        <input className="class-edit-input" id="teacher-edit-input" value={newTeacherName}
                               onChange={handleTeacherNameChange}></input>
                        <div className="edit-panel-save-button" onClick={handleTeacherSave}>Добавить</div>
                    </div>
                </div>
                : null}
        </div>)
};
export default TeacherPickPanel;