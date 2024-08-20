import React, {useEffect, useState} from 'react';
import {ReactComponent as ExpandIcon} from "../assets/expandIcon.svg";
import {GET_REQUEST_OPTIONS} from "../common";


const NotificationsLine = ({windowWidth, togglePopup, groupId,}) => {
    const [lastNotification, setLastNotification] = useState(null);
    const [noNotification, setNoNotification] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(true);
    useEffect(() => {
        //TODO подвязать в куки то что уведа скрыта и там типа чтобы еще она раскрывалась если после этого новая появилась бубубубу

        fetch(`https://localhost:7184/notifications/${groupId}/last`, GET_REQUEST_OPTIONS)
            .then(response => {
                if (response.status === 404) {
                    setNoNotification(true);
                    return null;
                } else {
                    setNoNotification(false);
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setLastNotification(data);
                }
            })
            .catch(error => {
                console.error('Error fetching last notification:', error);
            });
    }, [groupId]);

    if (noNotification) {
        return null;
    }

    return (
        <div className="notification-line-container">
            <div className="notification-line-header-container">
                <p className="notification-line-header-text">Последнее объявление</p>
                <button style={{
                    width: '33px',
                    cursor: 'pointer',
                    background: "none",
                    border: "none",
                    padding: "0"
                }}
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                    <ExpandIcon
                        style={windowWidth <= 930 ? {
                            marginLeft: '3px',
                            marginRight: '6px',
                            height: '5px',
                            width: '6px',
                            cursor: 'pointer'
                        } : {
                            marginLeft: '8px',
                            marginRight: '16px',
                            paddingTop: '0px',
                            cursor: 'pointer'
                        }}/></button>
                <button className="notification-line-secondary-text" onClick={togglePopup}>посмотреть другие
                    объявления
                </button>
            </div>
            {isNotificationOpen &&
                <p className="notification-line-primary-text">{lastNotification && lastNotification.message}</p>}
        </div>
    );
}

export default NotificationsLine;