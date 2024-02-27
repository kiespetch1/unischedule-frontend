import React from 'react'
import "./index.css";
import { ReactComponent as DotDivider } from "./assets/dot.svg";

const HeaderDay = ({ name, classCount}) => {
    const dotStyle = {
        paddingLeft: "15px",
        paddingRight: "15px"
      };
    return (
        <div className="dayHeader">
        <div className="dayHeaderText">{name}</div>
        <DotDivider style={dotStyle}/>
        <div className="classesText">{classCount} пары</div>
      </div>
  )};
  
  export default HeaderDay;