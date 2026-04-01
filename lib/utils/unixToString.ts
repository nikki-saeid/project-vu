export function unixToDBString(unixTimestamp: number) {
    // Multiply by 1000 for milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Returns format: YYYY-MM-DD HH:MM:SS
    return date.toISOString().replace('T', ' ').substring(0, 19);
}
