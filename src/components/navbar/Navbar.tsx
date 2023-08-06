import { Button, Grid, Layout, Typography, theme } from "antd";

import { DingtalkOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Navbar.scss";
import netlifyIdentity from "../../services/niw";
function Navbar() {

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
      <Button shape="round" onClick={()=>{
        netlifyIdentity.logout();
      }} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </Layout.Header>
  );
}

export default Navbar;
