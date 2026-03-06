export const generateUniqueSlug = (name: string) => {
    return (
        name
            .toLowerCase()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '') +
        '-' +
        new Date().getTime()
    );
};
