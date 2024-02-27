import React from "react";
import "./index.css";
import { ReactComponent as IconMenu } from "./assets/2sg.svg";

const SecondSubgroupButton = ({ label}) => {
  const iconStyle = {
    width: "24px",
    height: "24px",
    verticalAlign: "middle",
    marginRight: "15px",
    display: "inline-flex",
  };
  return (
    <button className="filter-button4">
      <span className="button-content">
        <IconMenu style={iconStyle} />
        <span className="filter-button-text">{label}</span>
      </span>
    </button>
  );
};

export default SecondSubgroupButton;


