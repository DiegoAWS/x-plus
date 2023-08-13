import { Avatar, Button, Grid, Layout, Typography, theme } from "antd";
import LogOutIcon from "../../assets/svg/LogOutIcon";
import useMainContext from "../../contexts/useMainContext";
import type { XUser } from "../../types";
import "./Navbar.scss";
import { UserOutlined } from "@ant-design/icons";

function Navbar() {
  const { netlifyIdentity } = useMainContext();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = netlifyIdentity.currentUser() as XUser;
  const companyName = user?.app_metadata?.companyName;
  const { sm } = Grid.useBreakpoint();

  const logout = () => {
    netlifyIdentity.logout();
  };

  return (
    <Layout.Header
      className="navbarWrapper"
      style={{
        background: colorBgContainer,
      }}
    >
      <div className="brandContainer">
        <Avatar src={user?.app_metadata?.logo}>{
          user?.app_metadata?.companyName?.charAt(0) || <UserOutlined />
        }</Avatar>
        {sm && (
          <Typography.Text ellipsis className="brandText">
            {companyName ? "Client: " + companyName : ""}
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
