import { Grid, Row, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import useMainContext from "../../contexts/useMainContext";
import { useState } from "react";
import Logo from "../../assets/Logo";

import "./Sidebar.scss";
import NavigationMenu from "../navigationMenu/NavigationMenu";
import SettingsMenu from "../settingsMenu/SettingsMenu";

const { useBreakpoint } = Grid;

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { token } = theme.useToken();
  const { isDarkTheme } = useMainContext();
  const { xl } = useBreakpoint();

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

        <NavigationMenu />
        <div className="sidebarDivider" />

        <SettingsMenu
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </Sider>
      {!isCollapsed && (
        <div className="sidebarBackdrop" onClick={() => setIsCollapsed(true)} />
      )}
    </>
  );
}

export default Sidebar;
