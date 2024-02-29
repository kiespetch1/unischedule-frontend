import React from "react";
import "../index.css";
import { ReactComponent as IconMenu } from "../assets/user-pic.svg";

const LoginButton = ({ label}) => {
  const iconStyle = {
    width: "19px",
    height: "24px",
    verticalAlign: "middle",
    marginRight: "20px",
    display: "inline-flex",
  };
  return (
    <button className="login-button">
      <span className="button-content">
        <IconMenu style={iconStyle} />
        <span className="filter-button-text">{label}</span>
      </span>
    </button>
  );
};

export default LoginButton;


