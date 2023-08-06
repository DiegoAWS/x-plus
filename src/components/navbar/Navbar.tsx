import { Button, Grid, Layout, Typography, theme } from "antd";
import useMainContext from "../../contexts/useMainContext";
import { DingtalkOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Navbar.scss";
function Navbar() {
  const { logout } = useMainContext();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { sm } = Grid.useBreakpoint();

  return (
    <Layout.Header
      className="navbarWrapper"
      style={{
        background: colorBgContainer,
      }}
    >
      <div className="brandContainer">
        <DingtalkOutlined
          style={{
            fontSize: 30,
            color: "red",
          }}
        />
        
          {sm && <Typography.Text ellipsis className="brandText">
          Brand Name
          </Typography.Text>}
       
      </div>
      <Button shape="round" onClick={logout} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </Layout.Header>
  );
}

export default Navbar;
