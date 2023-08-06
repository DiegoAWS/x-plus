import { Grid, Menu } from "antd";
import useMainContext from "../../contexts/useMainContext";
import type { TwitterToken } from "../../types";
import {
  ArrowRightOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import DarkThemeToggler from "../darkThemeToggler/DarkThemeToggler";

const MenuKeys = {
  UNCOLLAPSE: "uncollapse",
  USER: "user",
  DIVIDER: "divider",
  HELP: "help",
  DARKMODE: "darkmode",
};

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

function SettingsMenu({ isCollapsed, setIsCollapsed }: Props) {
  const { isDarkTheme, setDarkTheme, twitterToken } = useMainContext();
  const { xl } = Grid.useBreakpoint();
  const { me } = twitterToken as TwitterToken;

  return (
    <Menu
      theme={isDarkTheme ? "dark" : "light"}
      mode="inline"
      className="settingsMenuWrapper"
      // onClick={helperMenuClickHandler}
      selectable={false}
      items={[
        ...(isCollapsed && !xl
          ? [
              {
                key: MenuKeys.UNCOLLAPSE,
                icon: <ArrowRightOutlined />,
                label: "Expand sidebar",
                onClick: () => setIsCollapsed(false),
              },
            ]
          : []),
        {
          key: MenuKeys.USER,
          icon: <SettingOutlined />,
          label: me.data.name,
        },
        {
          type: 'divider', 
        },
        {
          key: MenuKeys.HELP,
          icon: <QuestionCircleOutlined />,
          label: "Help & getting started",
          onClick: () => window.open("http://youtube.com", "_blank"),
        },
        {
          key: MenuKeys.DARKMODE,
          title: isDarkTheme ? "Light mode" : "Dark mode",
          icon: <DarkThemeToggler isCollapsed={isCollapsed} /> ,
          disabled: !isCollapsed,
          onClick: () => isCollapsed && setDarkTheme(!isDarkTheme),
        },
      ]}
    />
  );
}

export default SettingsMenu;
