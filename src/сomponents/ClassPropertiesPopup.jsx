import {forwardRef} from 'react';
import "../index.css";

const ClassPropertiesPopup = forwardRef((props, ref) => {
    const {newWeekType, handleWeekTypeChange, newSubgroup, handleSubgroupChange} = props;

    return (
        <div className="class-properties-container" ref={ref}>
            <div className="class-properties-row">
                <div className="class-properties-text">Неделя:</div>
                <select className="location-dropdown"
                        value={newWeekType}
                        onChange={handleWeekTypeChange}
                        id="week-type-dropdown">
                    <option value="0">Все</option>
                    <option value="1">Нечетная</option>
                    <option value="2">Четная</option>
                </select>
            </div>
            <div className="class-properties-row">
                <div className="class-properties-text">Подгруппа:</div>
                <select className="location-dropdown"
                        value={newSubgroup}
                        onChange={handleSubgroupChange}
                        id="subroup-dropdown">
                    <option value="0">Нет</option>
                    <option value="1">Первая</option>
                    <option value="2">Вторая</option>
                </select>
            </div>
        </div>
    );
});

export default ClassPropertiesPopup;
