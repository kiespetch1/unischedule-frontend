import React, {useState, useRef, useEffect} from 'react';
import "../index.css";
import {ReactComponent as AddIcon} from "../assets/addInfoIcon.svg"
import {ReactComponent as MoveRightIcon} from "../assets/moveRightIcon.svg"
import {ReactComponent as MoveLeftIcon} from "../assets/moveLeftIcon.svg"

const LocationPickPanel = ({
                               handleLocationPick, handleLocationAdd, handleLocationSave, isAddingLocation,
                               newLocationType, newLocation, handleLocationTypeChange, handleLocationChange, isActive
                           }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScrollPosition, setMaxScrollPosition] = useState(0);
    const [locations, setLocations] = useState([]);
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
                const response = await fetch("https://localhost:7184/api/locations", getRequestOptions);
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных: ', error);
                setLocations([]);
            }
        }
        fetchData();
    }, [isActive, isAddingLocation])

    return (
        <div className="class-edit-main-container location">
            <div className="class-edit-inner-container first">
                <div className="class-edit-main-text">Локация:</div>
                <button className="class-edit-new-option" onClick={handleLocationAdd}><AddIcon/></button>
                <div className="scroll-container"
                     ref={containerRef}
                     id="myContainer"
                     style={{overflow: 'hidden', position: 'relative'}}>

                    <div ref={contentRef} style={{
                        transform: `translateX(-${scrollPosition}px)`,
                        transition: 'transform 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}>
                        {locations.map((item, index) => (
                            <div key={index}
                                 onClick={() => handleLocationPick(item.locationType, item.locationType === 0 ?
                                     item.classroom : item.link)}
                                 className="class-edit-option">
                                {item.locationType === 0 ? item.classroom : item.link}
                            </div>
                        ))}
                        {scrollPosition < maxScrollPosition ? <button onClick={() => handleScroll('left')}
                                                                   style={{
                                                                       position: "absolute",
                                                                       left: "428px",
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

            {isAddingLocation ?
                <div className="class-edit-secondary-container">
                    <div className="class-edit-inner-container second">
                        <div className="class-edit-secondary-text">Тип локации:</div>
                        <select className="location-dropdown"
                                value={newLocationType}
                                onChange={handleLocationTypeChange}
                                id="location-add-dropdown">
                            <option value="0">Очно</option>
                            <option value="1">Дистант</option>
                        </select>
                    </div>

                    <div className="class-edit-inner-container second">
                        <div className="class-edit-panel-new-container">
                            <div className="class-edit-secondary-text">Локация:</div>
                            <input className="class-edit-input" id="location-edit-input"
                                   value={newLocation}
                                   onChange={handleLocationChange}></input>
                            <button className="edit-panel-save-button" onClick={handleLocationSave}>Добавить</button>
                        </div>
                    </div>
                </div>
                : null}

        </div>
    );
};

export default LocationPickPanel;
