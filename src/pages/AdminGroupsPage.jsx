import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext.jsx'
import CourseGroups from '../сomponents/CourseGroups.jsx'
import {
    GET_REQUEST_OPTIONS_WITH_AUTH,
    getRussianRoleName,
    useWindowWidth,
} from '../common.ts'
import SearchIcon from '../assets/search.svg?react'
import CrossIcon from '../assets/cross.svg?react'
import Skeleton from 'react-loading-skeleton'
import GroupButton from '../сomponents/GroupButton.jsx'
import Header from '../сomponents/Header.jsx'
import DotDivider from '../assets/blackDot.svg?react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Footer from '../сomponents/Footer.jsx'

const AdminGroupsPage = () => {
    const { allowedGroup, editPermissions } = useContext(AuthContext)
    const [currentRole, setCurrentRole] = useState('')
    const [groupsInfo, setGroupsInfo] = useState('')
    const [isLoaded, setLoaded] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [allowedGroupObject, setAllowedGroupObject] = useState({})
    const windowWidth = useWindowWidth()
    const navigate = useNavigate()

    const crossIconStyle = {
        height: '14px',
        width: '14px',
        cursor: 'pointer',
        animationName: 'smooth-expanding-14px',
        animationDuration: '0.1s',
    }

    const crossIconSmallStyle = {
        height: '9px',
        width: '9px',
        cursor: 'pointer',
        animationName: 'smooth-expanding-7px',
        animationDuration: '0.1s',
    }

    const searchIconStyle = {
        height: '18px',
        width: '18px',
        margin: '0 16px 0 12px',
        transform: 'scaleX(-1)',
    }

    const searchIconSmallStyle = {
        height: '11px',
        width: '11px',
        margin: '0 8px 0 6px',
        transform: 'scaleX(-1)',
    }

    function clearInput() {
        setInputValue('')
    }

    useEffect(() => {
        const fetchGroup = (id) => {
            if (id !== null && id !== undefined && id !== 'all') {
                fetch(`/api/groups/${id}`, GET_REQUEST_OPTIONS_WITH_AUTH)
                    .then((response) => response.json())
                    .then((data) => {
                        setAllowedGroupObject(data)
                    })
            }
        }
        const checkAuthorization = async () => {
            const value = Cookies.get('auth')
            if (value === 'true') {
                const response = await fetch(
                    '/api/users/me',
                    GET_REQUEST_OPTIONS_WITH_AUTH
                )
                if (response.ok) {
                    const data = await response.json()
                    setCurrentRole(data.role)
                } else {
                    setCurrentRole('')
                }
            } else {
                setCurrentRole('')
            }
        }

        checkAuthorization()
        fetchGroup(allowedGroup)
    }, [allowedGroup, allowedGroupObject])

    useEffect(() => {
        fetch('/api/groups', GET_REQUEST_OPTIONS_WITH_AUTH)
            .then((response) => response.json())
            .then((data) => {
                setGroupsInfo(data.data)
                setLoaded(true)
            })
            .catch((error) => {
                console.log('Ошибка при загрузке данных: ' + error)
            })
    }, [])

    useEffect(() => {}, [])

    if (!editPermissions) {
        toast.error('Похоже, что у вас нет прав на редактирование этой группы.')
        navigate('/login')
    }

    return (
        <>
            <Header />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginLeft: '40px',
                    minHeight: 'calc(100vh - 92px - 71px)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <a
                        className="groups-choose-text"
                        style={{ margin: '24px 0 0 0' }}
                    >
                        Управляемые группы
                    </a>
                    <DotDivider
                        style={{
                            marginTop: '24px',
                            marginRight: '12px',
                            marginLeft: '12px',
                        }}
                    />
                    <a
                        className="groups-choose-secondary-text"
                        style={{ margin: '24px 6px 0 0' }}
                    >
                        текущая роль:
                    </a>
                    <a
                        className="groups-choose-secondary-text"
                        style={{ margin: '24px 0 0 0' }}
                    >
                        {getRussianRoleName(currentRole).toLowerCase()}
                    </a>
                </div>

                <div
                    className="primary-text"
                    style={{ marginBottom: '24px', marginTop: '12px' }}
                >
                    Выберите группу для редактирования
                </div>

                <div className="search-bar">
                    <SearchIcon
                        style={
                            windowWidth <= 930
                                ? searchIconSmallStyle
                                : searchIconStyle
                        }
                    />
                    <input
                        className="search-bar-input"
                        type="search"
                        placeholder="Введите название группы"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        id="group-search"
                    />
                    {inputValue && inputValue.length > 0 ? (
                        <CrossIcon
                            style={
                                windowWidth <= 930
                                    ? crossIconSmallStyle
                                    : crossIconStyle
                            }
                            onClick={clearInput}
                        />
                    ) : null}
                </div>

                {!isLoaded ? (
                    <div style={{ maxWidth: '300px' }}>
                        {[...Array(3)].map((_, index) =>
                            windowWidth >= 930 ? (
                                <div
                                    key={index}
                                    style={{ marginBottom: '20px' }}
                                >
                                    <Skeleton
                                        height={18}
                                        width={100}
                                        style={{
                                            marginBottom: '10px',
                                            marginTop: '24px',
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Skeleton
                                            height={39}
                                            width={150}
                                            style={{
                                                borderRadius: '20px',
                                                marginTop: '16px',
                                                marginRight: '16px',
                                            }}
                                        />
                                        <Skeleton
                                            height={39}
                                            width={150}
                                            style={{
                                                borderRadius: '20px',
                                                marginTop: '16px',
                                                marginRight: '16px',
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    style={{ marginBottom: '12px' }}
                                >
                                    <Skeleton
                                        height={10}
                                        width={32}
                                        style={{
                                            marginBottom: '5px',
                                            marginTop: '8px',
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Skeleton
                                            height={20}
                                            width={65}
                                            style={{
                                                borderRadius: '20px',
                                                marginTop: '8px',
                                                marginRight: '8px',
                                            }}
                                        />
                                        <Skeleton
                                            height={20}
                                            width={65}
                                            style={{
                                                borderRadius: '20px',
                                                marginTop: '8px',
                                                marginRight: '8px',
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : allowedGroup === 'all' ? (
                    <>
                        <CourseGroups
                            grade="1"
                            groups={groupsInfo}
                            filter={inputValue}
                            isMainScreen={false}
                        />
                        <CourseGroups
                            grade="2"
                            groups={groupsInfo}
                            filter={inputValue}
                            isMainScreen={false}
                        />
                        <CourseGroups
                            grade="3"
                            groups={groupsInfo}
                            filter={inputValue}
                            isMainScreen={false}
                        />
                        <CourseGroups
                            grade="4"
                            groups={groupsInfo}
                            filter={inputValue}
                            isMainScreen={false}
                        />
                    </>
                ) : (
                    <>
                        <div>
                            <div className="grade-container">
                                <div className="grade-text">
                                    {allowedGroupObject.grade} курс
                                </div>
                                <div className="grade-divider" />
                            </div>

                            <GroupButton
                                key={allowedGroup}
                                group={allowedGroupObject.name}
                                link={'/edit/' + allowedGroupObject.id}
                            />
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    )
}

export default AdminGroupsPage
