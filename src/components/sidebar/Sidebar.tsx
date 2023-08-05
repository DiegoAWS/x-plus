import { Divider, Grid, Menu, Row, Typography, theme } from "antd";
import {
  AppstoreOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  CloudOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import useMainContext from "../../contexts/useMainContext";
import { createElement, useState } from "react";
import Logo from "../../assets/Logo";
import "./Sidebar.scss";
import DarkThemeToggler from "../darkThemeToggler/DarkThemeToggler";
import MoonIcon from "../../assets/svg/MoonIcon";
import SunIcon from "../../assets/svg/SunIcon";



const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));
const { useBreakpoint } = Grid;

const MenuKeys = {
  UNCOLLAPSE: "uncollapse",
  DIVIDER: "divider",
  HELP: "help",
  DARKMODE: "darkmode",
};

function Sidebar() {
    const {token } = theme.useToken();
  const { isDarkTheme, setDarkTheme } = useMainContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { xl } = useBreakpoint();
  console.log({ xl });

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
    <>
      <Sider
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="sidebarWrapper"
        collapsible
        trigger={null}
        collapsed={!xl && isCollapsed}
        breakpoint="md"
        width={250}
        theme={isDarkTheme ? "dark" : "light"}
        style={{
            borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <Row justify="center" align="middle" className="titleMiniRow">
          <Logo />
          {!isCollapsed && <Typography.Title level={3}>-PLUS</Typography.Title>}
        </Row>

        <Menu
          theme={isDarkTheme ? "dark" : "light"}
          mode="inline"
          items={items}
          selectedKeys={["1"]}
        />
        <div className="sidebarDivider" />

        <Menu
          theme={isDarkTheme ? "dark" : "light"}
          mode="inline"
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
              icon: isCollapsed && !xl ? (
                isDarkTheme ? (
                  <SunIcon />
                ) : (
                  <MoonIcon />
                )
              ) : (
                <DarkThemeToggler />
              ),
              disabled: !isCollapsed,
            },
          ]}
        />
      </Sider>
      {!isCollapsed && (
        <div className="sidebarBackdrop" onClick={() => setIsCollapsed(true)} />
      )}
    </>
  );
}

export default Sidebar;
