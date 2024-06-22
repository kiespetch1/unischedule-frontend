import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NotificationsSkeleton = () => {
    return (
        <React.Fragment>
            <div className="notification-divider-secondary"></div>
            <div className="notification-block">
                <Skeleton width={100} height={16} />
                <Skeleton width={220} height={18} style={{margin: "16px 0 16px 0"}}/>
                <Skeleton width={100} height={16} />
                <Skeleton width={370} height={18} style={{margin: "16px 0 16px 0"}}/>
                <Skeleton width={100} height={16} />
                <Skeleton width={315} height={18} style={{margin: "16px 0 16px 0"}}/>
            </div>
        </React.Fragment>
    );
};

export default NotificationsSkeleton;
