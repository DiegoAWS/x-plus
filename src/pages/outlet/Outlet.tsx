import { Grid, Layout, Typography } from "antd";
import { Outlet as RouterOutlet, useLocation } from "react-router-dom";
import "./Outlet.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { sidebarCollapsedWidth, sidebarWidth } from "../../constants";
import { HOME_PATH, routes } from "../../router";

function Outlet() {
  const { xl } = Grid.useBreakpoint();
  const { pathname } = useLocation();

  const title = (routes.find(({ path }) => path === HOME_PATH)?.children || [])
    .filter(({ title }) => Boolean(title))
    .find(({ path }) => path === pathname)?.title;

  return (
    <Layout hasSider className="outletWrapper">
      <Sidebar />

      <Layout
        className="siteLayout"
        style={{
          marginLeft: xl ? sidebarWidth : sidebarCollapsedWidth,
        }}
      >
        <Navbar />

        <Layout.Content className="mainContent">
          <Typography.Title level={2}>{title}</Typography.Title>

          <RouterOutlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default Outlet;
