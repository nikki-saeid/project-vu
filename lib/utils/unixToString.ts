import { format } from 'date-fns';

export function unixToDBString(unixTimestamp: number) {
    // Multiply by 1000 for milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Returns format: YYYY-MM-DD HH:MM:SS
    return date.toISOString().replace('T', ' ').substring(0, 19);
}

export function unixToFormatString(unixTimestamp: number, formatDate: string) {
    // Multiply by 1000 for milliseconds
    const date = new Date(unixTimestamp * 1000);

    return format(date, formatDate);
}
