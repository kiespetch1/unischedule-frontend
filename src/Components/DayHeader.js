import React from 'react'
import "../index.css";
import { ReactComponent as DotDivider } from "../assets/dot.svg";

const HeaderDay = ({ name, classCount}) => {
    const dotStyle = {
        paddingLeft: "15px",
        paddingRight: "15px"
      };
    return (
        <div className="day-header">
        <div className="day-header-text">{name}</div>
        <DotDivider style={dotStyle}/>
        <div className="classes-text">{classCount} пары</div>
      </div>
  )};
  
  export default HeaderDay;