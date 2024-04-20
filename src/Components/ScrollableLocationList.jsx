import React, {useState, useRef, useEffect} from 'react';
import "../index.css";
import {ReactComponent as AddIcon} from "../assets/addInfoIcon.svg"
import {ReactComponent as MoveRightIcon} from "../assets/moveRightIcon.svg"
import {ReactComponent as MoveLeftIcon} from "../assets/moveLeftIcon.svg"

const ScrollableLocationList = ({
                                    locations, handleLocationPick, handleLocationAdd, isAddingLocation, locationType,
                                    handleOptionChange, handleLocationSave
                                }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScrollPosition, setMaxScrollPosition] = useState(0);
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

    return (
        <div className="class-edit-main-container location">
            <div className="class-edit-inner-container first">
                <div className="class-edit-main-text">Локация:</div>
                <div className="class-edit-new-option" onClick={handleLocationAdd}><AddIcon /></div>
                <div className="scroll-container"
                     ref={containerRef}
                     id="myContainer"
                     style={{ overflow: 'hidden', position: 'relative' }}>

                    <div ref={contentRef} style={{
                        transform: `translateX(-${scrollPosition}px)`,
                        transition: 'transform 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}>
                        {locations.map((item, index) => (
                            <div key={index}
                                 onClick={() => handleLocationPick(item.locationType, item.locationType === 0 ? item.classroom : item.link)}
                                 className="class-edit-option">
                                {item.locationType === 0 ? item.classroom : item.link}
                            </div>
                        ))}
                        {scrollPosition < maxScrollPosition ? <div onClick={() => handleScroll('left')}
                                                                   style={{position: "absolute", left: "428px", top: "0px",
                                                                       cursor: "pointer", transition: 'transform 0.3s ease',
                                                                       transform: `translateX(${scrollPosition}px)`}}>
                            <MoveRightIcon />
                        </div> : null}
                        {scrollPosition > 0 ? <div onClick={() => handleScroll('right')}
                                                   style={{position: "absolute", left: "0px", top: "0px",
                                                       cursor: "pointer", transition: 'transform 0.3s ease',
                                                       transform: `translateX(${scrollPosition}px)`}}>
                            <MoveLeftIcon />
                        </div> : null}
                    </div>
                </div>

            </div>

            {isAddingLocation ?
                <div className="class-edit-secondary-container">
                    <div className="class-edit-inner-container second">
                        <div className="class-edit-secondary-text">Тип локации:</div>
                        <select className="location-dropdown"
                                value={locationType}
                                onChange={handleOptionChange}
                                id="location-add-dropdown">
                            <option value="irl">Очно</option>
                            <option value="distant">Дистант</option>
                        </select>
                    </div>

                    <div className="class-edit-inner-container second">
                        <div className="class-edit-panel-new-container">
                            <div className="class-edit-secondary-text">Локация:</div>
                            <input className="class-edit-input" id="location-edit-input"></input>
                            <div className="edit-panel-save-button" onClick={handleLocationSave}>Добавить</div>
                        </div>
                    </div>
                </div>
                : null}

        </div>
    );
};

export default ScrollableLocationList;
