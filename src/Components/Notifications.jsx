import React from 'react';
import {ReactComponent as ExpandIcon } from "../assets/expandIcon.svg";


const Notifications = (togglePopup) => {
    return (
        <div className="notification-line-container">
            <div className="notification-line-header-container">
                <p className="notification-line-header-text">Последнее объявление</p>
                <ExpandIcon style={{marginLeft: '8px', marginRight:  '16px'}}/>
                <button className="notification-line-secondary-text" onClick={togglePopup}>посмотреть другие объявления</button>
            </div>
            <p className="notification-line-primary-text">я обманщик лютый бро</p>
        </div>
    );
}

export default Notifications;