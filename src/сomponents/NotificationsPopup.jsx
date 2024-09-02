import {forwardRef, useEffect, useState, useCallback, useContext} from 'react';
import Dot from "../assets/darkGrayDot.svg?react";
import NotificationBlock from './NotificationBlock';
import NotificationsSkeleton from "./skeletons/NotificationsSkeleton";
import {GET_REQUEST_OPTIONS, GET_REQUEST_OPTIONS_WITH_AUTH} from "../common";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from 'react-router-dom';
import PopupsContext from '../context/PopupsContext';


const NotificationPopup = forwardRef(({groupName, groupId}, ref) => {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const defaultGroupId = 1;
    const [groupIdDuplicate, setGroupIdDuplicate] = useState(groupId || defaultGroupId);
    const [groupNameDuplicate, setGroupNameDuplicate] = useState(groupName || "");
    const location = useLocation();
    const navigate = useNavigate();
    const [isGroupPage, setIsGroupPage] = useState(false);
    const { setIsNotificationPopupOpen } = useContext(PopupsContext);


    const enableGroupChooser = () => {
        setIsNotificationPopupOpen(false);
        navigate("/groups");
    }

    const fetchGroupName = useCallback((id) => {
        return fetch(`/api/groups/${id}`, GET_REQUEST_OPTIONS_WITH_AUTH)
            .then(response => response.json())
            .then(data => {
                setGroupNameDuplicate(data.name);
            })
            .catch(error => {
                console.error('Error fetching group name:', error);
            });
    }, []);

    useEffect(() => {
        if (location.pathname.includes("/group") && location.pathname !== "/groups") {
            setIsGroupPage(true);
        }
    }, [location]);

    const loadNotifications = useCallback((page) => {
        setIsLoading(true);

        const fetchNotifications = () => {
            fetch(`/api/notifications?groupId=${groupIdDuplicate}&page=${page}`,
                GET_REQUEST_OPTIONS)
                .then(response => response.json())
                .then(data => {
                    setNotifications((prevItems) => {
                        const newNotifications = data.data.filter(newItem =>
                            !prevItems.some(item => item.id === newItem.id));
                        return [...prevItems, ...newNotifications];
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                    setIsLoading(false);
                    toast.error("Не удалось загрузить уведомления.")
                });
        };

        if (groupNameDuplicate === "") {
            fetchGroupName(groupIdDuplicate).then(() => {
                fetchNotifications();
            });
        } else {
            fetchNotifications();
        }
    }, [groupIdDuplicate, groupNameDuplicate, fetchGroupName]);

    useEffect(() => {
        if (!groupName) {
            fetchGroupName(groupIdDuplicate);
        }
        loadNotifications(page);
    }, [page, loadNotifications, groupId, groupName, groupIdDuplicate, fetchGroupName]);


    const groupNotificationsByDate = (notifications) => {
        const groupedNotifications = [];
        let lastDate = '';

        notifications.forEach((notification) => {
            const notificationDate = notification.createdAt.split('T')[0];
            const showDate = notificationDate !== lastDate;
            groupedNotifications.push({...notification, showDate});
            lastDate = notificationDate;
        });

        return groupedNotifications;
    };

    const handleNotificationsLoad = () => {
        loadNotifications(page);
        setPage(page + 1);
    }

    const groupedNotifications = groupNotificationsByDate(notifications);

    if (!isGroupPage) {
        return (<div
            ref={ref}
            className="notification-container"
        >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%"
                            }}>
                                <p className="notification-header-text">Выберите группу чтобы увидеть уведомления</p>
                                <button className="login-popup-button"
                                        onClick={enableGroupChooser}
                                        style={{width: "200px", marginTop: "20px"}}>К выбору группы</button>
                            </div>
        </div>);
    }

    return (
        <div
            ref={ref}
            className="notification-container"
        >
            <div className="notification-header">
                <div className="notification-inner-header">
                    <p className="notification-header-text">Объявления группы</p>
                    <p className="notification-group-header-text" style={{marginLeft: "6px"}}>{groupNameDuplicate} </p>
                    <Dot style={{marginLeft: "12px"}}/>
                    <button onClick={enableGroupChooser} className="notification-secondary-header-text">сменить группу
                    </button>
                </div>
                <div className="notification-divider"></div>
            </div>
                <div>
                    {isLoading ? (
                        <NotificationsSkeleton/>
                    ) : (
                        groupedNotifications.length === 0 ? (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "200px"
                            }}>
                                <p className="notification-header-text">Здесь пока ничего нет...</p>
                            </div>
                        ) : (
                            groupedNotifications.map((notification) => (
                                <NotificationBlock key={notification.id} notification={notification}
                                                   showDate={notification.showDate}/>
                            )))
                    )}
                    {!isLoading && groupedNotifications.length > 0 &&  groupedNotifications.length % 6 === 0 && (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button className="load-more-button" onClick={handleNotificationsLoad}>
                                Загрузить более старые объявления
                            </button>
                        </div>
                    )}
                </div>
        </div>
    );

});

export default NotificationPopup;
