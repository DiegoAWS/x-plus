import { Divider, Grid, Row, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import useMainContext from "../../contexts/useMainContext";
import { useState } from "react";
import Logo from "../../assets/Logo";
import NavigationMenu from "../navigationMenu/NavigationMenu";
import SettingsMenu from "../settingsMenu/SettingsMenu";
import { sidebarCollapsedWidth, sidebarWidth } from "../../constants";
import "./Sidebar.scss";


function Sidebar() {
  
  const { token } = theme.useToken();
  const { isDarkTheme } = useMainContext();
  const { xl } = Grid.useBreakpoint();

  const [isCollapsed, setIsCollapsed] = useState(!xl);

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
        width={sidebarWidth}
        collapsedWidth={sidebarCollapsedWidth}
        theme={isDarkTheme ? "dark" : "light"}
        style={{
          borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <Row justify="center" align="middle" className="titleMiniRow">
          <Logo />
          {(!isCollapsed || xl) &&  <Typography.Title level={3}>-PLUS</Typography.Title>}
        </Row>
        <Divider className="titleDivider"/>
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
