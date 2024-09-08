import Header from "../../сomponents/Header.jsx";
import Footer from "../../сomponents/Footer.jsx";
import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {GET_REQUEST_OPTIONS, GET_REQUEST_OPTIONS_WITH_AUTH} from "../../common.ts";
import toast from "react-hot-toast";
import Dot from "../../assets/darkGrayDot.svg?react";
import NotificationsSkeleton from "../../сomponents/skeletons/NotificationsSkeleton.jsx";
import NotificationBlock from "../../сomponents/NotificationBlock.jsx";

const NotificationsPage = () => {
    let params = useParams();
    const groupId = params.groupId;
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);    const [groupIdDuplicate] = useState(groupId);
    const [groupName, setGroupName] = useState( "");
    const navigate = useNavigate();
    const [notificationsCount, setNotificationsCount] = useState(0);

    const enableGroupChooser = () => {
        navigate("/groups");
    }

    if (groupId === undefined) {
        return(
            <div>
                <Header/>
                <div style={{minHeight: "calc(100vh - 42px - 45px)", display: "flex", justifyContent: "center"}}>
                    <div
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
                                    style={{width: "200px", marginTop: "20px"}}>К выбору группы
                            </button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    const fetchGroupName = useCallback((id) => {
        if (groupId !== undefined) {
            return fetch(`/api/groups/${id}`, GET_REQUEST_OPTIONS_WITH_AUTH)
                .then(response => response.json())
                .then(data => {
                    setGroupName(data.name);
                })
                .catch(error => {
                    console.error('Error fetching group name:', error);
                });
        }
    }, []);

    const loadNotifications = useCallback((page) => {
        setIsLoading(true);

        const fetchNotifications = () => {
            fetch(`/api/notifications?groupId=${groupIdDuplicate}&page=${page}&resultCount=12`,
                GET_REQUEST_OPTIONS)
                .then(response => response.json())
                .then(data => {
                    setNotifications((prevItems) => {
                        const newNotifications = data.data.filter(newItem =>
                            !prevItems.some(item => item.id === newItem.id));
                        return [...prevItems, ...newNotifications];
                    });
                    setIsLoading(false);
                    setNotificationsCount(data.totalCount)

                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                    setIsLoading(false);
                    toast.error("Не удалось загрузить уведомления.")
                });
        };

        if (groupName === "") {
            fetchGroupName(groupIdDuplicate).then(() => {
                fetchNotifications();
            });
        } else {
            fetchNotifications();
        }
    }, [groupIdDuplicate, groupName, fetchGroupName]);

    useEffect(() => {
        if (groupName === "") {
            fetchGroupName(groupIdDuplicate);
        }
        loadNotifications(page);
    }, [page, loadNotifications, groupId, groupName, groupIdDuplicate, fetchGroupName]);

    const handleNotificationsLoad = () => {
        loadNotifications(page);
        setPage(page + 1);
    };

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
        <div>
            <Header/>
            <div style={{minHeight: "calc(100vh - 86px)", background: "#F0F0F0", borderRadius: "0 0 5px 5px"}}>
                <div className="notifications-container-mobile">
                    <p className="notification-header-text">Объявления группы</p>
                    <p className="notification-group-header-text">{groupName} </p>
                    <Dot style={{marginLeft: "8px", height: "3px", width: "3px"}}/>
                    <button onClick={() => navigate("/groups")}
                            className="notification-secondary-header-text">сменить группу
                    </button>
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
                    {!isLoading && groupedNotifications.length > 0 && groupedNotifications.length !== notificationsCount && (
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <button className="load-more-button" onClick={handleNotificationsLoad}>
                                Загрузить более старые объявления
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default NotificationsPage;