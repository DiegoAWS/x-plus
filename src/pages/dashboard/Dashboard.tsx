import { Grid, Layout, Typography, theme } from "antd";
import "./Dashboard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { sidebarCollapsedWidth, sidebarWidth } from "../../constants";

function Dashboard() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { xl } = Grid.useBreakpoint();

  return (
    <Layout hasSider className="dashboardWrapper">
      <Sidebar />

      <Layout className="siteLayout" style={{
        marginLeft: xl ? sidebarWidth: sidebarCollapsedWidth,
      }}>
        <Navbar />
     
        <Layout.Content className="mainContent">
          <Typography.Title level={2}>Dashboard</Typography.Title>
          <div
          className="cardWrapper"
            style={{
              background: colorBgContainer,
            }}
          >
            <Typography.Title level={3}>Welcome to -PLUS</Typography.Title>
          </div>
          <div
          className="cardWrapper"
            style={{
              background: colorBgContainer,
            }}
          >
            <Typography.Title level={3}>Welcome to -PLUS</Typography.Title>
          </div>
          <div
          className="cardWrapper"
            style={{
              background: colorBgContainer,
            }}
          >
            <Typography.Title level={3}>Welcome to -PLUS</Typography.Title>
          </div>
          <div
          className="cardWrapper"
            style={{
              background: colorBgContainer,
            }}
          >
            <Typography.Title level={3}>Welcome to -PLUS</Typography.Title>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
