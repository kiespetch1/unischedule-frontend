import React, { forwardRef, useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { ReactComponent as Dot } from "../assets/darkGrayDot.svg";
import NotificationBlock from './NotificationBlock';
import debounce from 'lodash/debounce';
import NotificationsSkeleton from "./Skeletons/NotificationsSkeleton";

const NotificationPopup = forwardRef(({ groupName }, ref) => {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const scrollPositionRef = useRef(0);
    const containerRef = useRef(ref);

    const loadNotifications = useCallback((page) => {
        setIsLoading(true);
        const getRequestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(`https://localhost:7184/notifications?page=${page}`, getRequestOptions)
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
    }, []);

    useEffect(() => {
        loadNotifications(page);
    }, [page, loadNotifications]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = scrollPositionRef.current;
        }
    }, [notifications]);

    const handleScroll = useCallback(debounce(() => {
        const container = containerRef.current;
        if (container && container.scrollTop + container.clientHeight >= container.scrollHeight && !isLoading) {
            scrollPositionRef.current = container.scrollTop;

            setPage(prevPage => prevPage + 1);
        }
    }, 200), [isLoading]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
            handleScroll.cancel();
        };
    }, [handleScroll]);

    const groupNotificationsByDate = (notifications) => {
        const groupedNotifications = [];
        let lastDate = '';

        notifications.forEach((notification) => {
            const notificationDate = notification.createdAt.split('T')[0];
            const showDate = notificationDate !== lastDate;
            groupedNotifications.push({ ...notification, showDate });
            lastDate = notificationDate;
        });

        return groupedNotifications;
    };

    const groupedNotifications = groupNotificationsByDate(notifications);

    return (
        <div
            ref={containerRef}
            className="notification-container"
        >
            <div className="notification-header">
                <div className="notification-inner-header">
                    <p className="notification-header-text">Объявления группы</p>
                    <p className="notification-group-header-text" style={{ marginLeft: "6px" }}>{groupName} </p>
                    <Dot style={{ marginLeft: "12px" }} />
                    <button onClick={() => {}} className="notification-secondary-header-text">сменить группу</button>
                </div>
                <div className="notification-divider"></div>
            </div>
            {isLoading && page === 1 ? (
                <NotificationsSkeleton />
            ) : (
                groupedNotifications.map((notification) => (
                    <NotificationBlock key={notification.id} notification={notification} showDate={notification.showDate} />
                ))
            )}
            {isLoading && page > 1 && <NotificationsSkeleton />}
        </div>
    );
});

export default NotificationPopup;
