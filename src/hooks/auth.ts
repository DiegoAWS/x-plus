import { useEffect, useState } from "react";

const LOCALE_STORAGE_KEY = "auth";

function useAuth() {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async () => {

    }

    const logout = async () => {
        localStorage.removeItem(LOCALE_STORAGE_KEY);
        setUser(null);
        setToken(null);
    }

    useEffect(() => {

        try {
            const auth = localStorage.getItem(LOCALE_STORAGE_KEY);
            if (auth) {
                // decode token from base64 to string
                const decoded = Buffer.from(auth, "base64").toString("utf-8");
                const { user, token } = JSON.parse(decoded);
                setUser(user);
                setToken(token);
            }
        } catch (error) {
            console.log(error);
        }

    }, []);

    return { user, token, login, logout };
}

export default useAuth;
