import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FiltersSkeleton = () => {
    return (
        <div className="filters-skeleton">
            <div className="filter-item">
                <div className="filter-label">
                    <Skeleton width={50} style={{marginBottom: 9}}/>
                </div>
                <Skeleton width={315} height={47} style={{marginRight: 10, borderRadius: 40}}/>
            </div>
            <div className="filter-item">
                <div className="filter-label">
                    <Skeleton width={50} style={{marginBottom: 9}}/>
                </div>
                <Skeleton width={315} height={47} style={{marginRight: 10, borderRadius: 40}}/>
            </div>
        </div>
    );
};

export default FiltersSkeleton;
