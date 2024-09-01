import { useEffect, useState } from "react";
import ChangeIcon from "../assets/change.svg?react";
import ChangeIconSmall from "../assets/changeSmall.svg?react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FiltersSkeleton from "./skeletons/FiltersSkeleton";
import WeekToggle from "./WeekToggle";
import SubgroupToggle from "./SubgroupToggle";
import {useWindowWidth} from "../common";

const Filters = ({ groupName, hasSubgroups, isLoading }) => {
    const windowWidth = useWindowWidth();
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Новое состояние


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
                            <Skeleton width={windowWidth <= 930 ? 50 : 125}
                                      height={windowWidth <= 930 ? 14 : 27} />
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
                {(!isLoading && isFirstLoad) ? (
                    <FiltersSkeleton windowWidth={windowWidth}/>
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
