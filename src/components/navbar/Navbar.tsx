import { Button, Grid, Layout, Typography, theme } from "antd";

import { DingtalkOutlined } from "@ant-design/icons";
import "./Navbar.scss";
import netlifyIdentity from "../../services/niw";
import LogOutIcon from "../../assets/svg/LogOutIcon";

function Navbar() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { sm } = Grid.useBreakpoint();

  const logout = () => {
    netlifyIdentity.logout();
    window.location.reload(); // HARD refresh
  };

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

        {sm && (
          <Typography.Text ellipsis className="brandText">
            Brand Name
          </Typography.Text>
        )}
      </div>
      <Button shape="round" onClick={logout}>
        {netlifyIdentity.currentUser()?.email}
        <LogOutIcon className="logoutIcon" />
      </Button>
    </Layout.Header>
  );
}

export default Navbar;
