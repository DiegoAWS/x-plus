import { ConfigProvider, Switch } from "antd";
import { createContext, useState } from "react";
import { getTheme } from "../theme/theme";
import MoonIcon from "../assets/svg/MoonIcon";
import SunIcon from "../assets/svg/SunIcon";

export type MainContextType = {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
}

export const MainContext = createContext<MainContextType>({
  isDarkTheme: false,
  setIsDarkTheme: () => {},
});

function MainContextProvider({ children }: React.PropsWithChildren) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  return (
    <MainContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <ConfigProvider theme={getTheme(isDarkTheme)}>
        <Switch
          style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
          checked={isDarkTheme}
          checkedChildren={<MoonIcon />}
          unCheckedChildren={<SunIcon />}
          onChange={(value) => {
            setIsDarkTheme(value);
          }}
        />
        {children}
      </ConfigProvider>
    </MainContext.Provider>
  );
}


export default MainContextProvider;

