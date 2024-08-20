"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.useSetWeekType = exports.useMaxScrollPosition = exports.useWindowWidth = exports.CREATE_REQUEST_OPTIONS_WITH_AUTH = exports.CREATE_REQUEST_OPTIONS = exports.POST_REQUEST_OPTIONS_WITH_AUTH = exports.POST_REQUEST_OPTIONS = exports.PUT_REQUEST_OPTIONS_WITH_AUTH = exports.PUT_REQUEST_OPTIONS = exports.DELETE_REQUEST_OPTIONS_WITH_AUTH = exports.DELETE_REQUEST_OPTIONS = exports.GET_REQUEST_OPTIONS_WITH_AUTH = exports.GET_REQUEST_OPTIONS = void 0;
var react_1 = require("react");
// region Request Options Settings Constants
exports.GET_REQUEST_OPTIONS = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
};
exports.GET_REQUEST_OPTIONS_WITH_AUTH = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
};
exports.DELETE_REQUEST_OPTIONS = {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json'
    }
};
exports.DELETE_REQUEST_OPTIONS_WITH_AUTH = {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
};
exports.PUT_REQUEST_OPTIONS = {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json'
    }
};
exports.PUT_REQUEST_OPTIONS_WITH_AUTH = {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
};
exports.POST_REQUEST_OPTIONS = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }
};
exports.POST_REQUEST_OPTIONS_WITH_AUTH = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
};
exports.CREATE_REQUEST_OPTIONS = {
    method: "CREATE",
    headers: {
        'Content-Type': 'application/json'
    }
};
exports.CREATE_REQUEST_OPTIONS_WITH_AUTH = {
    method: "CREATE",
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
};
// endregion
// region Hooks
var useWindowWidth = function () {
    var _a = (0, react_1.useState)(document.documentElement.clientWidth), windowWidth = _a[0], setWindowWidth = _a[1];
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            setWindowWidth(document.documentElement.clientWidth);
        };
        window.addEventListener('resize', handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return windowWidth;
};
exports.useWindowWidth = useWindowWidth;
var useMaxScrollPosition = function (containerRef, contentRef, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    var _a = (0, react_1.useState)(0), maxScrollPosition = _a[0], setMaxScrollPosition = _a[1];
    var updateMaxScroll = (0, react_1.useCallback)(function () {
        var observedElement = containerRef.current;
        var contentElement = contentRef.current;
        if (observedElement && contentElement) {
            var containerWidth = observedElement.offsetWidth;
            var contentWidth = contentElement.offsetWidth;
            var maxScroll = Math.max(0, contentWidth - containerWidth);
            setMaxScrollPosition(maxScroll);
        }
        else {
            console.log('Observed element or content element is missing.');
        }
    }, [containerRef, contentRef]);
    (0, react_1.useEffect)(function () {
        var observedElement = containerRef.current;
        var resizeObserver = new ResizeObserver(updateMaxScroll);
        var mutationObserver = new MutationObserver(updateMaxScroll);
        if (observedElement) {
            resizeObserver.observe(observedElement);
            mutationObserver.observe(observedElement, { attributes: true, childList: true, subtree: true });
            updateMaxScroll();
        }
        return function () {
            if (observedElement) {
                resizeObserver.unobserve(observedElement);
                mutationObserver.disconnect();
            }
        };
    }, __spreadArray([containerRef, updateMaxScroll], dependencies, true));
    return maxScrollPosition;
};
exports.useMaxScrollPosition = useMaxScrollPosition;
var useSetWeekType = function (navigate, location, setWeekType) { return (0, react_1.useCallback)(function (weekType) {
    var searchParams = new URLSearchParams(location.search);
    searchParams.set('week', weekType);
    navigate("?".concat(searchParams.toString()));
    setWeekType(weekType);
}, [setWeekType, navigate, location.search]); };
exports.useSetWeekType = useSetWeekType;
// endregion
