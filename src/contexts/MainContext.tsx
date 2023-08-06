import { ConfigProvider } from "antd";
import { createContext, useCallback, useEffect, useState } from "react";
import netlifyIdentity, { type User } from "netlify-identity-widget";
import {
  THEME_KEY,
  TWITTER_TOKEN,
  createLocalStorage,
} from "../services/localStore";
import { getTheme } from "../theme/theme";
import type { TwitterToken } from "../types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type MainContextType = {
  isDarkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
  twitterToken: TwitterToken | null;
  storeTwitterToken: (token: TwitterToken) => void;
  logout: () => void;
  user: User | null;
  netlifyIdentity: typeof netlifyIdentity;
};

export const MainContext = createContext<MainContextType>({
  isDarkTheme: false,
  setDarkTheme: () => {},
  twitterToken: null,
  storeTwitterToken: () => {},
  logout: () => {},
  user: null,
  netlifyIdentity,
});

function MainContextProvider({ children }: React.PropsWithChildren) {
  const [twitterToken, setTwitterToken] = useState(
    createLocalStorage(TWITTER_TOKEN).getObject() || null
  );
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    createLocalStorage(THEME_KEY).getObject() || false
  );

  const setDarkTheme = useCallback((value: boolean) => {
    setIsDarkTheme(value);
    createLocalStorage(THEME_KEY).setObject(value);
  }, []);

  const storeTwitterToken = useCallback((token: TwitterToken) => {
    setTwitterToken(token);
    createLocalStorage(TWITTER_TOKEN).setObject(token);
  }, []);

  const logout = useCallback(() => {
    setTwitterToken(null);
    createLocalStorage(TWITTER_TOKEN).remove();
  }, []);

  const theme = getTheme(isDarkTheme);

  const [user, setUser] = useState<User | null>(null);

  const updateUserIdentity = useCallback(() => {
    console.log("updateUserIdentity");
    setUser(netlifyIdentity.currentUser());
  }, []);
  useEffect(() => {
    console.log("init");
    netlifyIdentity.init();
    netlifyIdentity.on("init", (user) => {
      updateUserIdentity();
      console.log("init", user);
    });

    netlifyIdentity.on("login", (user) => {
      netlifyIdentity.close();
      updateUserIdentity();
      console.log("login", user);
    });
    
    netlifyIdentity.on("logout", () => {
      updateUserIdentity();
      console.log("Logged out");
    });

    netlifyIdentity.on("error", (err) => console.error("Error", err));
    updateUserIdentity();

    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
      netlifyIdentity.off("init");
      netlifyIdentity.off("error");
    };
  }, [updateUserIdentity]);

  const context = {
    twitterToken,
    storeTwitterToken,
    isDarkTheme,
    setDarkTheme,
    logout,
    netlifyIdentity,
    user,
  };

  return (
    <MainContext.Provider value={context}>
      <ConfigProvider theme={theme}>
        <ToastContainer theme={isDarkTheme ? "dark" : "light"} />
        {children}
      </ConfigProvider>
    </MainContext.Provider>
  );
}

export default MainContextProvider;
