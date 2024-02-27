import React from "react";
import "./index.css";
import { ReactComponent as IconMenu } from "./assets/1sg.svg";

const FirstSubgroupButton = ({ label}) => {
  const iconStyle = {
    width: "24px",
    height: "24px",
    verticalAlign: "middle",
    marginRight: "15px",
    display: "inline-flex",
  };
  return (
    <button className="filter-button1">
      <span className="button-content">
        <IconMenu style={iconStyle} />
        <span className="filter-button-text">{label}</span>
      </span>
    </button>
  );
};

export default FirstSubgroupButton;


