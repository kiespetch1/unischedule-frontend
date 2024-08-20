import React from 'react';
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import Linkify from 'react-linkify';

const NotificationBlock = ({ notification, showDate }) => {
    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        return format(parseISO(isoDate), "d MMMM", { locale: ru });
    };

    const linkifyDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    return (
        <React.Fragment>
            {showDate && <div className="notification-divider-secondary"></div>}
            <div className="notification-block">
                {showDate &&
                    <p className="notification-date-text">{formatDate(notification.createdAt)}</p>}
                {showDate ? (
                    <p className={
                        notification.priority === 2 ? "notification-important-announcement-text"
                            : notification.priority === 1 ? "notification-announcement-text"
                                : "notification-text"
                    }>
                        <Linkify componentDecorator={linkifyDecorator}>
                            {notification.message}
                        </Linkify>
                    </p>
                ) : (
                    <p className={
                        notification.priority === 2 ? "notification-important-announcement-text no-top-margin"
                            : notification.priority === 1 ? "notification-announcement-text no-top-margin"
                                : "notification-text no-top-margin"
                    }>
                        <Linkify componentDecorator={linkifyDecorator}>
                            {notification.message}
                        </Linkify>
                    </p>
                )}
            </div>
        </React.Fragment>
    );
};

export default NotificationBlock;
