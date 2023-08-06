import { Grid, Menu, type MenuProps, Divider } from "antd";
import useMainContext from "../../contexts/useMainContext";
import type { TwitterToken } from "../../types";
import {
  ArrowRightOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import DarkThemeToggler from "../darkThemeToggler/DarkThemeToggler";

const { useBreakpoint } = Grid;
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
  const { xl } = useBreakpoint();
  const { me } = twitterToken as TwitterToken;

  const helperMenuClickHandler = (({ key }) => {
    switch (key) {
      case MenuKeys.UNCOLLAPSE:
        setIsCollapsed(false);
        break;

      case MenuKeys.HELP:
        window.open("http://youtube.com", "_blank");
        break;

      case MenuKeys.DARKMODE:
        setDarkTheme(!isDarkTheme);
        break;
        
      default:
        break;
    }
  }) as MenuProps["onClick"];


  return (
    <Menu
      theme={isDarkTheme ? "dark" : "light"}
      mode="inline"
      className="settingsMenuWrapper"
      onClick={helperMenuClickHandler}
      selectable={false}
      items={[
        ...(isCollapsed && !xl
          ? [
              {
                key: MenuKeys.UNCOLLAPSE,
                icon: <ArrowRightOutlined />,
                label: "Expand sidebar",
              },
            ]
          : []),
        {
          key: MenuKeys.USER,

          icon: <SettingOutlined />,
          label: me.data.name,
        },
        {
          key: MenuKeys.DIVIDER,
          disabled: true,
          icon: <Divider />,
        },
        {
          key: MenuKeys.HELP,
          icon: <QuestionCircleOutlined />,
          label: "Help & getting started",
        },
        {
          key: MenuKeys.DARKMODE,
          title: isDarkTheme ? "Light mode" : "Dark mode",
          icon: <DarkThemeToggler isCollapsed={isCollapsed} /> ,
          disabled: !isCollapsed,
        },
      ]}
    />
  );
}

export default SettingsMenu;
