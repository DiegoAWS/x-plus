import { Button, Grid, Layout, Typography, theme } from "antd";

import { DingtalkOutlined } from "@ant-design/icons";
import "./Navbar.scss";

import LogOutIcon from "../../assets/svg/LogOutIcon";
import useMainContext from "../../contexts/useMainContext";

function Navbar() {
  const { netlifyIdentity, user } = useMainContext();
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
        {user?.email}
        <LogOutIcon className="logoutIcon" />
      </Button>
    </Layout.Header>
  );
}

export default Navbar;
