import { Button, Layout, Space, Typography, theme } from "antd";
import "./Dashboard.scss";
import useMainContext from "../../contexts/useMainContext";
import Sidebar from "../../components/sidebar/Sidebar";

const { Header, Content } = Layout;

function Dashboard() {
  const { logout } = useMainContext();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider className="dashboardWrapper">
      <Sidebar />

      <Layout className="site-layout" style={{ marginLeft: 80 }}>
        <Header
          className="navbarWrapper"
          style={{
            background: colorBgContainer,
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <Space>
            <Button type="default" size="small" danger onClick={logout}>
              Logout
            </Button>
          </Space>
        </Header>
        <Content className="mainContent">
          <Typography.Title level={2}>Dashboard</Typography.Title>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          ></div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
