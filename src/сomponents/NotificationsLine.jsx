import {useContext, useEffect, useState} from 'react';
import ExpandIcon from "../assets/expandIcon.svg?react";
import {GET_REQUEST_OPTIONS, useWindowWidth} from "../common";
import PopupsContext from "../context/PopupsContext.jsx";

const NotificationsLine = ({groupId}) => {
    const {setIsNotificationPopupOpen, isNotificationPopupOpen} = useContext(PopupsContext);
    const [lastNotification, setLastNotification] = useState(null);
    const [isNotificationPresent, setIsNotificationPresent] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(true);
    const windowWidth = useWindowWidth();
    useEffect(() => {
        fetch(`api/notifications/${groupId}/last`, GET_REQUEST_OPTIONS)
            .then(response => {
                if (response.status === 404) {
                    setIsNotificationPresent(false);
                    return null;
                } else {
                    setIsNotificationPresent(true);
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

    const handleNotificationClick = () => {
        setIsNotificationPopupOpen(!isNotificationPopupOpen);
    };

    if (!isNotificationPresent) {
        return null;
    }

    return (
        <div className="notification-line-container">
            <div className="notification-line-header-container">
                <p className="notification-line-header-text">Последнее объявление</p>
                <button style={windowWidth <= 930 ? {
                    width: '16px',
                    cursor: 'pointer',
                    background: "none",
                    border: "none",
                    padding: "0"
                } : {
                    width: '33px',
                    cursor: 'pointer',
                    background: "none",
                    border: "none",
                    padding: "0"
                }}
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                    {!isNotificationOpen ?
                        <ExpandIcon
                            style={windowWidth <= 930 ? {
                                marginLeft: '3px',
                                marginRight: '6px',
                                height: '4px',
                                width: '5px',
                                cursor: 'pointer'
                            } : {
                                marginLeft: '8px',
                                marginRight: '16px',
                                paddingTop: '0px',
                                cursor: 'pointer'
                            }}/> :
                        <ExpandIcon
                            style={windowWidth <= 930 ? {
                                marginLeft: '3px',
                                marginRight: '6px',
                                height: '4px',
                                width: '5px',
                                cursor: 'pointer',
                                rotate: '180deg'
                            } : {
                                marginLeft: '8px',
                                marginRight: '16px',
                                paddingTop: '0px',
                                cursor: 'pointer',
                                rotate: '180deg'
                            }}/>
                    }
                </button>
                <button className="notification-line-secondary-text" onClick={handleNotificationClick}>посмотреть другие
                    объявления
                </button>
            </div>
            {isNotificationOpen &&
                <p className="notification-line-primary-text">{lastNotification && lastNotification.message}</p>}
        </div>
    );
}

export default NotificationsLine;