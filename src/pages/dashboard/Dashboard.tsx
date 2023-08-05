import React from "react";

import { Button, Layout, Space, Typography, theme } from "antd";
import "./Dashboard.scss";
import type { TwitterToken } from "../../types";
import useMainContext from "../../contexts/useMainContext";
import Sidebar from "../../components/sidebar/Sidebar";

const { Header, Content } = Layout;

function Dashboard() {
  const { twitterToken, logout } = useMainContext();
  const { me } = twitterToken as TwitterToken;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider className="dashboardWrapper">
      <Sidebar />

      <Layout className="site-layout" style={{ marginLeft: 80 }}>
        <Header
          className="navbarWrapper"
          title={me.data.name}
          style={{
            background: colorBgContainer,
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <Space>
           
            <Typography.Text>{me?.data?.name}</Typography.Text>

            <Button type="default" size="small" danger onClick={logout}>
              Logout
            </Button>
          </Space>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? "more" : "..."}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
