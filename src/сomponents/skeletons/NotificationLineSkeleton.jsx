import Skeleton from "react-loading-skeleton";
import ExpandIcon from "../../assets/expandIcon.svg?react";
import {useWindowWidth} from "../../common";

const NotificationLineSkeleton = () => {
    const windowWidth = useWindowWidth();
    return (
        <div className="notification-line-container">
            <div className="notification-line-header-container">
                <Skeleton height={windowWidth <= 930 ? 14 : 21} width={windowWidth <= 930 ? 115 : 207}/>
                <ExpandIcon
                    style={windowWidth <= 930 ? {marginLeft: '3px', marginRight: '6px', height: '5px', width: '6px'} : {
                        marginLeft: '8px',
                        marginRight: '16px',
                        paddingTop: '0px',
                    }}/>
                <Skeleton height={windowWidth <= 930 ? 14 : 21} width={windowWidth <= 930 ? 152 : 273} />
            </div>
            <Skeleton height={windowWidth <= 930 ? 14 : 21} width={windowWidth <= 930 ? 100 : 201} />
        </div>
    );
}

export default NotificationLineSkeleton;