export function getStartAndEndOfWeek(date) {
    const currentDay = date.getDay();

    let daysUntilNextMonday = 1 - currentDay;
    if (daysUntilNextMonday > 0) {
        daysUntilNextMonday -= 7;
    }

    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + daysUntilNextMonday);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return {
        startOfWeek: formatDate(startOfWeek),
        endOfWeek: formatDate(endOfWeek),
    };
}

export function getWeekNumber(date) {
    let academicYearStart = new Date(date.getFullYear(), 8, 2); // 2 сентября нынешнего года
                                                                //TODO: добавить конфиг какой то откуда задавать дату начала академического года
    // Вычисляем разницу в днях между сегодняшней датой и датой начала
    let diffDays = Math.floor((date.getTime() - academicYearStart.getTime()) / (1000 * 60 * 60 * 24));

    // Если сегодняшняя дата находится до 5 февраля, отступаем на год назад
    if (diffDays < 0) {
        academicYearStart = new Date(date.getFullYear() - 1, 1, 5);
        diffDays = Math.floor((date.getTime() - academicYearStart.getTime()) / (1000 * 60 * 60 * 24));
    }

    // Вычисляем номер недели, делим разницу в днях на 7 и прибавляем 1
    return Math.ceil((diffDays + 1) / 7);
}
