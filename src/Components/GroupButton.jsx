import React from "react";

const GroupButton = ({group, link}) => {
    return (
        <div className="group-buttons-container">
            <a href={link} className="group-button">
                <div className="group-button-text">{group}</div>
            </a>
        </div>)
}

export default GroupButton;