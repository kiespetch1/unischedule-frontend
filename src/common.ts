import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { Location } from 'react-router-dom'

// region Request Options Settings Constants
export const GET_REQUEST_OPTIONS: RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const GET_REQUEST_OPTIONS_WITH_AUTH: RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
}

export const DELETE_REQUEST_OPTIONS: RequestInit = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const DELETE_REQUEST_OPTIONS_WITH_AUTH: RequestInit = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
}

export const PUT_REQUEST_OPTIONS: RequestInit = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const PUT_REQUEST_OPTIONS_WITH_AUTH: RequestInit = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
}

export const POST_REQUEST_OPTIONS: RequestInit = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const POST_REQUEST_OPTIONS_WITH_AUTH: RequestInit = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
}

export const CREATE_REQUEST_OPTIONS: RequestInit = {
    method: 'CREATE',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const CREATE_REQUEST_OPTIONS_WITH_AUTH: RequestInit = {
    method: 'CREATE',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
}

// endregion

// region Hooks
export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState<number>(
        document.documentElement.clientWidth
    )

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowWidth
}

type Primitive = string | number | boolean | null | undefined

export const useMaxScrollPosition = (
    containerRef: MutableRefObject<HTMLDivElement | null>,
    contentRef: MutableRefObject<HTMLDivElement | null>,
    dependencies: Primitive[] = []
): number => {
    const [maxScrollPosition, setMaxScrollPosition] = useState(0)

    const updateMaxScroll = useCallback(() => {
        const observedElement = containerRef.current
        const contentElement = contentRef.current

        if (observedElement && contentElement) {
            const containerWidth = observedElement.offsetWidth
            const contentWidth = contentElement.offsetWidth
            const maxScroll = Math.max(0, contentWidth - containerWidth)
            setMaxScrollPosition(maxScroll)
        } else {
            console.log('Observed element or content element is missing.')
        }
    }, [containerRef, contentRef])

    useEffect(() => {
        const observedElement = containerRef.current

        const resizeObserver = new ResizeObserver(updateMaxScroll)
        const mutationObserver = new MutationObserver(updateMaxScroll)

        if (observedElement) {
            resizeObserver.observe(observedElement)
            mutationObserver.observe(observedElement, {
                attributes: true,
                childList: true,
                subtree: true,
            })
            updateMaxScroll()
        }

        return () => {
            if (observedElement) {
                resizeObserver.unobserve(observedElement)
                mutationObserver.disconnect()
            }
        }
    }, [containerRef, updateMaxScroll, ...dependencies])

    return maxScrollPosition
}

export const useSetWeekType = (
    navigate: (path: string) => void,
    location: Location,
    setWeekType: (type: string) => void
) =>
    useCallback(
        (weekType: 'odd' | 'even') => {
            const searchParams = new URLSearchParams(location.search)
            searchParams.set('week', weekType)
            navigate(`?${searchParams.toString()}`)
            setWeekType(weekType)
        },
        [setWeekType, navigate, location.search]
    )

// endregion

// region Utils
export const getRussianRoleName = (role: string): string => {
    switch (role.toLowerCase()) {
        case 'admin':
            return 'Администратор'
        case 'user':
            return 'Пользователь'
        case 'staff':
            return 'Сотрудник ВУЗа'
        case 'groupleader':
            return 'Староста группы'
        default:
            return ''
    }
}
// endregion
