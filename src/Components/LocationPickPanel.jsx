import React, {useState, useRef, useEffect} from 'react';
import "../index.css";
import {ReactComponent as AddIcon} from "../assets/addInfoIcon.svg"
import {ReactComponent as MoveRightIcon} from "../assets/moveRightIcon.svg"
import {ReactComponent as MoveLeftIcon} from "../assets/moveLeftIcon.svg"

const LocationPickPanel = ({
                               handleLocationPick, handleLocationAdd, handleLocationSave, isAddingLocation,
                               newLocationType, newLocation, handleLocationTypeChange, handleLocationChange, isActive,
                               isFilterActive, filter
                           }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScrollPosition, setMaxScrollPosition] = useState(0);
    const [locations, setLocations] = useState([]);
    const [refreshElement, setRefreshElement] = useState(0);
    const contentRef = useRef(null);
    const containerRef = useRef(null);
    const [filteredLocations, setFilteredLocations] = useState([]);

    useEffect(() => {
        let filteredLocations = locations;

        if (filter && isFilterActive) {
            filteredLocations = filteredLocations
                .filter(location => (location.classroom?.toLowerCase().includes(filter.toLowerCase())) ||
                    (location.link?.toLowerCase().includes(filter.toLowerCase())));
        }

        setFilteredLocations(filteredLocations);
    }, [filter, isFilterActive, locations]);

    useEffect(() => {
        const observedElement = containerRef.current;
        const contentElement = contentRef.current;

        const updateMaxScroll = () => {
            if (observedElement && contentElement) {
                const containerWidth = observedElement.offsetWidth;
                const contentWidth = contentElement.offsetWidth;
                const maxScroll = Math.max(0, contentWidth - containerWidth);
                setMaxScrollPosition(maxScroll); // если проблемы со скроллом, мб можно убрать 20
            } else {
                console.log('Observed element or content element is missing.');
            }
        };

        const resizeObserver = new ResizeObserver(updateMaxScroll);
        const mutationObserver = new MutationObserver(updateMaxScroll);

        if (observedElement) {
            resizeObserver.observe(observedElement);
            mutationObserver.observe(observedElement, { attributes: true, childList: true, subtree: true });
            updateMaxScroll();
        }

        return () => {
            if (observedElement) {
                resizeObserver.unobserve(observedElement);
                mutationObserver.disconnect();
            }
        };
    }, [refreshElement]);


    const internalHandleLocationSave = () => {
        handleLocationSave();
        setTimeout(() => {
            refreshComponent();
        }, 200);

    }

    const refreshComponent = () => {
        setRefreshElement(refreshElement + 1);
    };

    const handleScroll = (direction) => {
        const step = 300;
        let newPosition = scrollPosition + (direction === 'left' ? step : -step);

        newPosition = Math.max(0, Math.min(newPosition, maxScrollPosition));

        setScrollPosition(newPosition);
    };

    useEffect(() => {
        const getRequestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
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
    }, [isActive, isAddingLocation, refreshElement])

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
                        {filteredLocations.map((item, index) => (
                            <div key={index}
                                 onClick={() => handleLocationPick(item.locationType, item.locationType === 0 ?
                                     item.classroom : item.link, item.id)}
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
                            <button className="edit-panel-save-button" onClick={internalHandleLocationSave}>Добавить</button>
                        </div>
                    </div>
                </div>
                : null}

        </div>
    );
};

export default LocationPickPanel;
