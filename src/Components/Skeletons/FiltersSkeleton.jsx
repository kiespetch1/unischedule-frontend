import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FiltersSkeleton = ({windowWidth}) => {
    return (
        <div style={{display: "flex"}}>
            {windowWidth > 930 ?
                <div className="filters-skeleton">
                    <div className="week-type-container">
                        <div className="filter-item">
                            <div className="filter-label">
                                <Skeleton width={55} style={{marginBottom: 9}}/>
                            </div>
                            <Skeleton width={315} height={47} style={{marginRight: 10, borderRadius: 40}}/>
                        </div>
                    </div>
                    <div className="subgroup-container">
                        <div className="filter-item">
                            <div className="filter-label">
                                <Skeleton width={122} style={{marginBottom: 9}}/>
                            </div>
                            <Skeleton width={315} height={47} style={{marginRight: 10, borderRadius: 40}}/>
                        </div>
                    </div>
                </div>
                :
                <div className="filters-skeleton">
                    <div className="week-type-container">
                        <div className="filter-item">
                            <div className="filter-label">
                                <Skeleton width={29} height={10} style={{padding: 0}}
                                          containerClassName={"filter-label-span"}/>
                            </div>
                            <Skeleton width={122} height={22} style={{
                                marginTop: 6,
                                marginRight: 12,
                                borderRadius: 40
                            }}/>
                        </div>
                    </div>
                    <div className="subgroup-container">
                        <div className="filter-item">
                            <div className="filter-label">
                                <Skeleton width={29} height={10} style={{marginBottom: 6}}
                                          containerClassName={"filter-label-span"}/>
                            </div>
                            <Skeleton width={122} height={22} style={{
                                marginTop: 6,
                                marginRight: 10,
                                borderRadius: 40
                            }}/>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default FiltersSkeleton;
