import React from 'react'
import "../index.css";
import { ReactComponent as DotDivider } from "../assets/dot.svg";

const HeaderDay = ({ name, classCount}) => {
    const dotStyle = {
        paddingLeft: "15px",
        paddingRight: "15px"
    };

    function num_word(value, words){
        value = Math.abs(value) % 100;
        let num = value % 10;
        if(value > 10 && value < 20) return words[2];
        if(num > 1 && num < 5) return words[1];
        if(num === 1) return words[0];
        return words[2];
    }

    let classesText = num_word(classCount, ['пара', 'пары', 'пар'])

    return (
        <div className="day-header">
            <div className="day-header-text">{name}</div>
            <DotDivider style={dotStyle}/>
            <div className="classes-text">{classCount === 0 ? "выходной" : classCount + " " + classesText}</div>
        </div>
    );
};

export default HeaderDay;
