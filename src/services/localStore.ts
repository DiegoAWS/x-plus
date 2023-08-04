export const THEME_KEY = 'theme';

export const createLocalStorage = (key: string) => ({
    get: () => localStorage.getItem(key),
    set: (value: string) => localStorage.setItem(key, value),

    getObject: () => {
        try {
            return JSON.parse(localStorage.getItem(key) || '{}');
        } catch (e) {
            console.log(e);
            return {};
        }
    },
    setObject: (value: object | boolean | number) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);


        }
    },
    remove: () => localStorage.removeItem(key),
})