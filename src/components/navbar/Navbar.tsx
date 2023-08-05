import { Button, Layout, Space, Typography, theme } from "antd";
import useMainContext from "../../contexts/useMainContext";
import "./Navbar.scss";
import Logo from "../../assets/Logo";
import type { TwitterToken } from "../../types";
import SunIcon from "../../assets/svg/SunIcon";
import MoonIcon from "../../assets/svg/MoonIcon";

const { useToken } = theme;

const { Header } = Layout;
function Navbar() {
  const { twitterToken, logout, isDarkTheme, setDarkTheme } = useMainContext();
  const { me } = twitterToken as TwitterToken;

  const { token } = useToken();

  console.log(twitterToken);

  return (
    <Header
      className="navbarWrapper"
      title={me.data.name}
      style={{ background: token?.colorBgContainer }}
    >
      <Logo />

      <Space>
        <Button
          icon={isDarkTheme ? <SunIcon /> : <MoonIcon />}
          onClick={() => setDarkTheme(!isDarkTheme)}
          className="themeButtonToggler"
          size="large"
          title={isDarkTheme ? "Light Mode" : "Dark Mode"}
        />
        <Typography.Text>{me?.data?.name}</Typography.Text>

        <Button type="default" size="small" danger onClick={logout}>
          Logout
        </Button>
      </Space>
    </Header>
  );
}

export default Navbar;
