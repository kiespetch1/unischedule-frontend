import { useEffect, useState } from 'react'
import GroupButton from './GroupButton'

const CourseGroups = ({ grade, groups, filter, isMainScreen }) => {
    const [filteredGroups, setFilteredGroups] = useState([])
    grade = parseInt(grade)

    useEffect(() => {
        let filteredGroups = []

        if (Array.isArray(groups)) {
            filteredGroups = groups.filter((group) => group.grade === grade)
        } else if (groups && groups.grade === grade) {
            filteredGroups = [groups]
        }

        if (filter) {
            filteredGroups = filteredGroups.filter((group) =>
                group.name.toLowerCase().includes(filter.toLowerCase())
            )
        }

        setFilteredGroups(filteredGroups)
    }, [filter, grade, groups])

    return (
        <div>
            {filteredGroups.length > 0 ? (
                <div className="grade-container">
                    <div className="grade-text">{grade} курс</div>
                    <div className="grade-divider" />
                </div>
            ) : null}

            {filteredGroups.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {filteredGroups.map((group) => (
                        <GroupButton
                            key={group.id}
                            group={group.name}
                            link={
                                isMainScreen
                                    ? '/group/' + group.id
                                    : '/edit/' + group.id
                            }
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default CourseGroups
