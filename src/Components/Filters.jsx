import React, { useEffect, useState } from "react";
import { ReactComponent as ChangeIcon } from "../assets/change.svg";
import { ReactComponent as ChangeIconSmall } from "../assets/changeSmall.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FiltersSkeleton from "./Skeletons/FiltersSkeleton";
import WeekToggle from "./WeekToggle";
import SubgroupToggle from "./SubgroupToggle";

const Filters = ({ groupName, hasSubgroups, isLoading }) => {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Новое состояние

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!isLoading && isFirstLoad) {
            setIsFirstLoad(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <div className="filters-container">
            <div className="filters-content-container">
                <div className="group-container">
                    <div className="group-filter-text">Группа</div>
                    <div className="group-name">
                        {groupName === null ? (
                            <Skeleton width="125px" height="27px" />
                        ) : (
                            <div className="bold-group-text">{groupName}</div>
                        )}
                        <a href="/groups" className="switch-icon-wrapper">
                            {windowWidth <= 930 ? (
                                <div className="switch-icon">
                                    <ChangeIconSmall />
                                </div>
                            ) : (
                                <div className="switch-icon">
                                    <ChangeIcon />
                                </div>
                            )}
                        </a>
                    </div>
                </div>
                {isLoading && isFirstLoad ? (
                    <FiltersSkeleton />
                ) : (
                    <div style={{ display: "flex" }}>
                        <div className="week-type-container">
                            <WeekToggle />
                        </div>
                        {hasSubgroups && (
                            <div className="subgroup-container">
                                <SubgroupToggle />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;
