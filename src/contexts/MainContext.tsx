import { ConfigProvider, Switch } from "antd";
import { createContext, useState } from "react";
import MoonIcon from "../assets/svg/MoonIcon";
import SunIcon from "../assets/svg/SunIcon";
import { THEME_KEY, createLocalStorage } from "../services/localStore";
import { getTheme } from "../theme/theme";

export type MainContextType = {
  isDarkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
};

export const MainContext = createContext<MainContextType>({
  isDarkTheme: false,
  setDarkTheme: () => {},
});

function MainContextProvider({ children }: React.PropsWithChildren) {
  const { getObject, setObject } = createLocalStorage(THEME_KEY);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getObject() || false);

  const setDarkTheme = (value: boolean) => {
    setIsDarkTheme(value);
    setObject(value);
  };

  const theme = getTheme(isDarkTheme);

  return (
    <MainContext.Provider value={{ isDarkTheme, setDarkTheme }}>
      <ConfigProvider theme={theme}>
        <Switch
          style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
          checked={isDarkTheme}
          checkedChildren={<MoonIcon />}
          unCheckedChildren={<SunIcon />}
          onChange={(value) => {
            setDarkTheme(value);
          }}
        />
          {children}
      </ConfigProvider>
    </MainContext.Provider>
  );
}


export default MainContextProvider;

