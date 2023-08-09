import { Grid, Menu } from "antd";
import useMainContext from "../../contexts/useMainContext";
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
  const { isDarkTheme, setDarkTheme, netlifyIdentity } = useMainContext();
  const { xl } = Grid.useBreakpoint();
  



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
          label: netlifyIdentity.currentUser()?.user_metadata?.full_name,
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
          onClick: () => !xl && isCollapsed && setDarkTheme(!isDarkTheme),
        },
      ]}
    />
  );
}

export default SettingsMenu;
