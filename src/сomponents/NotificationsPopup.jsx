import {forwardRef, useEffect, useState, useRef, useCallback, useLayoutEffect} from 'react';
import Dot from "../assets/darkGrayDot.svg?react";
import NotificationBlock from './NotificationBlock';
import NotificationsSkeleton from "./skeletons/NotificationsSkeleton";
import GroupsComponent from "./GroupsComponent";
import {GET_REQUEST_OPTIONS, GET_REQUEST_OPTIONS_WITH_AUTH} from "../common";

const NotificationPopup = forwardRef(({groupName, groupId}, ref) => {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const scrollPositionRef = useRef(0);
    const defaultGroupId = 1;
    const [groupIdDuplicate, setGroupIdDuplicate] = useState(groupId || defaultGroupId);
    const [groupNameDuplicate, setGroupNameDuplicate] = useState(groupName || "");
    const [isChoosingGroup, setIsChoosingGroup] = useState(false);

    const enableGroupChooser = () => {
        setIsChoosingGroup(!isChoosingGroup);
    }

    const fetchGroupName = useCallback((id) => {
        return fetch(`https://localhost:7184/api/groups/${id}`, GET_REQUEST_OPTIONS_WITH_AUTH)
            .then(response => response.json())
            .then(data => {
                setGroupNameDuplicate(data.name);
            })
            .catch(error => {
                console.error('Error fetching group name:', error);
            });
    }, []);

    const loadNotifications = useCallback((page) => {
        setIsLoading(true);

        const fetchNotifications = () => {
            fetch(`https://localhost:7184/notifications?groupId=${groupIdDuplicate}&page=${page}`,
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

    useLayoutEffect(() => {
        const container = ref.current;
        if (container) {
            container.scrollTop = scrollPositionRef.current;
        }
    }, [notifications]);

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

    const groupedNotifications = groupNotificationsByDate(notifications);

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
            {isChoosingGroup ?
                <div style={{margin: "16px"}}>
                    <GroupsComponent isNotificationsVersion={true}/>
                </div>
                :
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
                            ))
                        )
                    )}
                    {isLoading && page > 1 && <NotificationsSkeleton/>}
                </div>}
        </div>
    );

});

export default NotificationPopup;
