import { Grid, Layout, Typography } from "antd";
import { Outlet as RouterOutlet } from "react-router-dom";
import "./Outlet.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { sidebarCollapsedWidth, sidebarWidth } from "../../constants";

function Outlet() {
  const { xl } = Grid.useBreakpoint();

  return (
    <Layout hasSider className="outletWrapper">
      <Sidebar />

      <Layout className="siteLayout" style={{
        marginLeft: xl ? sidebarWidth: sidebarCollapsedWidth,
      }}>
        <Navbar />
     
        <Layout.Content className="mainContent">
          <Typography.Title level={2}>Dashboard</Typography.Title>
         
          <RouterOutlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default Outlet;
