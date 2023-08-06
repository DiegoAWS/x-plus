import { Button, Layout, Space, Typography, theme } from "antd";
import useMainContext from "../../contexts/useMainContext";
import { DingtalkOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Navbar.scss";
function Navbar() {
  const { logout } = useMainContext();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      className="navbarWrapper"
      style={{
        background: colorBgContainer,
      }}
    >
      <Space align="baseline">
        <DingtalkOutlined
          style={{
            fontSize: 30,
            color: "red",
          }}
        />
        <Typography.Title  level={2}>My company brand</Typography.Title>
      </Space>
      <Button shape="round" onClick={logout} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </Layout.Header>
  );
}

export default Navbar;
