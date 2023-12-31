export const THEME_KEY = 'dark_theme';
export const TWITTER_TOKEN= 'twitter_token';
export const TWITTER_STATE= 'twitter_state';
export const createLocalStorage = (key: string) => ({
    get: () => localStorage.getItem(key),
    set: (value: string) => localStorage.setItem(key, value),

    getObject: () => {
        try {
            return JSON.parse(localStorage.getItem(key) || "null" );
        } catch (e) {
            console.log(e);
            return null;
        }
    },
    setObject: (value: object | boolean | number) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);


        }
    },
    clear: () => localStorage.removeItem(key),
})