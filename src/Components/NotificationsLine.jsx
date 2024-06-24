import React from 'react';
import {ReactComponent as ExpandIcon} from "../assets/expandIcon.svg";


const NotificationsLine = ({windowWidth, togglePopup}) => {

    return (
        <div className="notification-line-container">
            <div className="notification-line-header-container">
                <p className="notification-line-header-text">Последнее объявление</p>
                <ExpandIcon
                    style={windowWidth <= 930 ? {
                        marginLeft: '3px',
                        marginRight: '6px',
                        height: '5px',
                        width: '6px'
                    } : {
                        marginLeft: '8px',
                        marginRight: '16px',
                        paddingTop: '0px',
                    }}/>
                <button className="notification-line-secondary-text" onClick={togglePopup}>посмотреть другие
                    объявления
                </button>
            </div>
            <p className="notification-line-primary-text">я обманщик лютый бро</p>
                </div>
    );
}

export default NotificationsLine;