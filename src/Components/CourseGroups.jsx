import React from 'react';
import GroupButton from "./GroupButton";

const CourseGroups = ({ grade, groups }) => {
    let filteredGroups = [];
    grade = parseInt(grade);

    if (Array.isArray(groups)) {
        filteredGroups = groups.filter(group => group.grade === grade);
    } else if (groups && groups.grade === grade) {
        filteredGroups = [groups];
    }

    return (
        <div>
            {filteredGroups.length > 0 ? (
                <div className="grade-container">
                    <div className="grade-text">{grade} курс</div>
                    <div className="grade-divider" />
                </div>
            ) : null}

            {filteredGroups.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {filteredGroups.map(group => (
                        <GroupButton key={group.id} group={group.name} link={"/group=" + group.id} />
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default CourseGroups;
