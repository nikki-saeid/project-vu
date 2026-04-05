import { MONTHS } from '../constants/months';

export const getMonthIndex = (month: string | null) => {
    if (!month) return new Date().getMonth();
    return MONTHS.indexOf(month);
};

export const getMonthByIndex = (monthIndex: number) => {
    const month = MONTHS[monthIndex] ?? MONTHS[new Date().getMonth()];
    return month;
};

export const getPresentMonths = () => {
    return MONTHS.slice(0, new Date().getMonth() + 1);
};
