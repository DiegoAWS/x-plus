import { Button, Grid, Layout, Typography, theme } from "antd";
import LogOutIcon from "../../assets/svg/LogOutIcon";
import useMainContext from "../../contexts/useMainContext";
import type { XUser } from "../../types";
import "./Navbar.scss";

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
        {sm && (
          <Typography.Text ellipsis className="brandText">
            {companyName ? "Client: " + clientName : ""}
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
