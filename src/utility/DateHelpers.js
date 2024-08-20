"use strict";
exports.__esModule = true;
exports.getWeekNumber = exports.getStartAndEndOfWeek = void 0;
function getStartAndEndOfWeek(date) {
    var currentDay = date.getDay();
    var daysUntilNextMonday = 1 - currentDay;
    if (daysUntilNextMonday > 0) {
        daysUntilNextMonday -= 7;
    }
    var startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + daysUntilNextMonday);
    var endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);
    var formatDate = function (date) {
        var day = date.getDate().toString().padStart(2, "0");
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var year = date.getFullYear();
        return "".concat(day, ".").concat(month, ".").concat(year);
    };
    return {
        startOfWeek: formatDate(startOfWeek),
        endOfWeek: formatDate(endOfWeek)
    };
}
exports.getStartAndEndOfWeek = getStartAndEndOfWeek;
function getWeekNumber(date) {
    var academicYearStart = new Date(date.getFullYear(), 1, 5);
    // Вычисляем разницу в днях между сегодняшней датой и 5 февраля
    var diffDays = Math.floor((date.getTime() - academicYearStart.getTime()) / (1000 * 60 * 60 * 24));
    // Если сегодняшняя дата находится до 5 февраля, отступаем на год назад
    if (diffDays < 0) {
        academicYearStart = new Date(date.getFullYear() - 1, 1, 5);
        diffDays = Math.floor((date.getTime() - academicYearStart.getTime()) / (1000 * 60 * 60 * 24));
    }
    // Вычисляем номер недели, делим разницу в днях на 7 и прибавляем 1
    return Math.ceil((diffDays + 1) / 7);
}
exports.getWeekNumber = getWeekNumber;
