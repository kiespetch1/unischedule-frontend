import Header from '../сomponents/Header.jsx'
import Footer from '../сomponents/Footer.jsx'
import AddNotificationIcon from '../assets/addNotifcation.svg?react'
import ExpandQueryIcon from '../assets/expandQueryIcon.svg?react'
import ImportIcon from '../assets/importIcon.svg?react'
import { useEffect, useState } from 'react'
import { GET_REQUEST_OPTIONS_WITH_AUTH } from '../common.ts'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'

const GroupEditPage = () => {
    let params = useParams()
    const groupId = params.groupId
    const [isNotificationAddQueryOpen, setIsNotificationAddQueryOpen] =
        useState(false)
    const [isWeekImportQueryOpen, setIsWeekImportQueryOpen] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [newNotificationText, setNewNotificationText] = useState('')
    const [selectedPriority, setSelectedPriority] = useState(0)
    const [officialScheduleLink, setOfficialScheduleLink] = useState('')

    const handleNotificationsNameChange = (event) => {
        setNewNotificationText(event.target.value)
    }

    const handleOfficialScheduleLinkChange = (event) => {
        setOfficialScheduleLink(event.target.value)
    }

    const handlePriorityChange = (event) => {
        setSelectedPriority(Number(event.target.value))
    }

    useEffect(() => {
        const fetchGroupName = async () => {
            const response = await fetch(
                '/api/groups/' + groupId,
                GET_REQUEST_OPTIONS_WITH_AUTH
            )
            if (response.ok) {
                const data = await response.json()
                setGroupName(data.name)
            }
        }
        fetchGroupName()
    }, [groupId])

    const handleNotificationAdd = async () => {
        if (newNotificationText === '') {
            toast.error('Текст объявления не может быть пустым.')
        } else {
            await fetch('/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: newNotificationText,
                    targetGroupID: groupId,
                    priority: selectedPriority,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        toast.error('Не удалось добавить объявление.')
                    }
                })
                .then(() => {
                    toast.success('Объявление успешно добавлено!')
                })
                .catch((error) => {
                    console.error('Ошибка:', error)
                })
        }
    }

    const handleWeekImport = async () => {
        if (officialScheduleLink === '') {
            toast.error('Ссылка на расписание не может быть пустой.')
        } else {
            const params = new URLSearchParams({
                url: officialScheduleLink,
                groupId: groupId,
            })
            await fetch(
                '/api/weeks/url?' + params.toString(),
                GET_REQUEST_OPTIONS_WITH_AUTH
            ).then((response) => {
                if (!response.ok) {
                    toast.error('Не удалось импортировать неделю.')
                } else {
                    toast.success('Неделя успешно импортирована!')
                }
            })
        }
    }

    return (
        <div>
            <Header groupId={groupId} groupName={groupName} />
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
                        className="groups-regular-text"
                        style={{ margin: '24px 7px 0 0' }}
                    >
                        Управление группой
                    </a>
                    <a
                        className="groups-bold-text"
                        style={{ margin: '24px 0 0 0' }}
                    >
                        {groupName}
                    </a>
                </div>

                <div
                    className="edit-option-container"
                    style={{
                        margin: '24px 0 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={() =>
                            setIsNotificationAddQueryOpen(
                                !isNotificationAddQueryOpen
                            )
                        }
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                minWidth: '646px',
                            }}
                        >
                            <AddNotificationIcon
                                style={{ marginRight: '8px' }}
                            />
                            <a className="edit-option-text">
                                Добавить объявление
                            </a>
                            <ExpandQueryIcon
                                style={
                                    !isNotificationAddQueryOpen
                                        ? {
                                              marginLeft: '8px',
                                              marginTop: '13px',
                                          }
                                        : {
                                              marginLeft: '8px',
                                              marginTop: '13px',
                                              transform: 'rotate(180deg)',
                                          }
                                }
                            />
                        </div>
                    </button>

                    {isNotificationAddQueryOpen ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '12px',
                            }}
                        >
                            <input
                                type="text"
                                id="notification-text-input"
                                value={newNotificationText}
                                onChange={handleNotificationsNameChange}
                                placeholder="Введите текст объявления"
                                className="class-edit-input"
                                style={
                                    selectedPriority === 2
                                        ? {
                                              fontWeight: '700',
                                              width: '658px',
                                              height: '36px',
                                              marginRight: 0,
                                          }
                                        : selectedPriority === 1
                                          ? {
                                                fontWeight: '600',
                                                width: '658px',
                                                height: '36px',
                                                marginRight: 0,
                                            }
                                          : {
                                                width: '658px',
                                                height: '36px',
                                                marginRight: 0,
                                            }
                                }
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}
                                >
                                    <a
                                        className="primary-text"
                                        style={{
                                            marginTop: '5px',
                                            marginRight: '12px',
                                        }}
                                    >
                                        Приоритет:
                                    </a>
                                    <select
                                        className="location-dropdown"
                                        value={String(selectedPriority)}
                                        onChange={handlePriorityChange}
                                        style={{ width: '145px' }}
                                        id="priority-dropdown"
                                    >
                                        <option value="0">Обычный</option>
                                        <option value="1">Высокий</option>
                                        <option value="2">Очень высокий</option>
                                    </select>
                                </div>

                                <button
                                    className="day-save-button"
                                    onClick={handleNotificationAdd}
                                    style={{
                                        position: 'relative',
                                        marginTop: '12px',
                                        animation: 'none',
                                    }}
                                >
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div
                    className="edit-option-container"
                    style={{
                        margin: '8px 0 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={() =>
                            setIsWeekImportQueryOpen(!isWeekImportQueryOpen)
                        }
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                minWidth: '646px',
                            }}
                        >
                            <ImportIcon style={{ marginRight: '8px' }} />
                            <a className="edit-option-text">
                                Импортировать расписание с оф. сайта
                            </a>
                            <a
                                data-tooltip-id="beta-tooltip"
                                data-tooltip-content="Данная функция находится в бета-тесте - иногда расписание, импортированное с помощью этой функции может странно себя вести при редактировании. Если после импорта и редактирования дня произошли какие то ошибки, лучше очистить данный день и заполнить его вручную"
                                data-tooltip-place="top"
                                className="beta-mark"
                            >
                                beta
                            </a>
                            <Tooltip
                                id="beta-tooltip"
                                style={{ width: '300px' }}
                            />
                            <ExpandQueryIcon
                                style={
                                    !isWeekImportQueryOpen
                                        ? {
                                              marginLeft: '8px',
                                              marginTop: '13px',
                                          }
                                        : {
                                              marginLeft: '8px',
                                              marginTop: '13px',
                                              transform: 'rotate(180deg)',
                                          }
                                }
                            />
                        </div>
                    </button>

                    {isWeekImportQueryOpen ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '12px',
                                alignItems: 'center',
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
                                    className="primary-text"
                                    style={{
                                        marginRight: '8px',
                                        marginTop: '4px',
                                    }}
                                >
                                    Ссылка на официальное расписание:
                                </a>
                                <input
                                    type="text"
                                    id="notification-text-input"
                                    value={officialScheduleLink}
                                    onChange={handleOfficialScheduleLinkChange}
                                    placeholder="https://timetable.iate.obninsk.ru/group/12345"
                                    className="class-edit-input"
                                    style={{
                                        width: '308px',
                                        height: '36px',
                                    }}
                                />
                            </div>

                            <button
                                className="day-save-button"
                                onClick={handleWeekImport}
                                style={{
                                    position: 'relative',
                                    marginTop: '12px',
                                    alignSelf: 'flex-end',
                                    animation: 'none',
                                }}
                            >
                                Импортировать
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default GroupEditPage
