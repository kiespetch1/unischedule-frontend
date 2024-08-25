import Skeleton from "react-loading-skeleton";
import ExpandIcon from "../../assets/expandIcon.svg?react";
import {useWindowWidth} from "../../common";

const NotificationLineSkeleton = () => {
    const windowWidth = useWindowWidth();
    return (
        <div className="notification-line-container">
            <div className="notification-line-header-container">
                <Skeleton height={21} width={207} />
                <ExpandIcon
                    style={windowWidth <= 930 ? {marginLeft: '3px', marginRight: '6px', height: '5px', width: '6px'} : {
                        marginLeft: '8px',
                        marginRight: '16px',
                        paddingTop: '0px',
                    }}/>
                <Skeleton height={21} width={273} />
            </div>
            <Skeleton height={21} width={201} />
        </div>
    );
}

export default NotificationLineSkeleton;