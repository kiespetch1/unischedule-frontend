import React, {useEffect, useState} from 'react'
import "../index.css";
import { ReactComponent as DotDivider } from "../assets/dot.svg";

const HeaderDay = ({ name, classCount}) => {
    const dotStyle = {
        paddingLeft: "15px",
        paddingRight: "15px"
    };

    const dotSmallStyle = {
        height: "2.5px",
        width: "2.5px",
        paddingLeft: "9px",
        paddingRight: "9px",
    };

    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            <DotDivider style={windowWidth <= 930 ? dotSmallStyle : dotStyle}/>
            <div className="classes-text">{classCount === 0 ? "выходной" : classCount + " " + classesText}</div>
        </div>
    );
};

export default HeaderDay;
