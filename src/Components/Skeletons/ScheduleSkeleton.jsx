import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ScheduleSkeleton = ({windowWidth}) => {
    return (
        <div>
            {windowWidth <= 930 ?
                <div>
                    <Skeleton height={28} width={341} style={{borderRadius: "5px 5px 0 0"}}/>
                    <Skeleton height={72} width={341} style={{borderRadius: "0 0 5px 5px"}}/>
                    <Skeleton height={72} width={341} style={{borderRadius: "5px", marginTop: "6px"}}/>
                    <div className="day-end-block">
                    </div>
                </div>
                :
                <div>
                    <Skeleton height={49} width={600} style={{borderRadius: "5px 5px 0 0"}}/>
                    <Skeleton height={127} width={600} style={{borderRadius: "0 0 5px 5px"}}/>
                    <Skeleton height={127} width={600} style={{borderRadius: "5px", marginTop: "4px"}}/>
                    <div className="day-end-block">
                    </div>
                </div>}

        </div>
    );

};

export default ScheduleSkeleton;
