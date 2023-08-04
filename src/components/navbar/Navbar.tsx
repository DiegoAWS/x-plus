import { Button, Row, Typography } from "antd";
import useMainContext from "../../contexts/useMainContext";
import "./Navbar.scss";
import Logo from "../../assets/Logo";

function Navbar() {
  const { twitterToken, logout } = useMainContext();
  const { me } = twitterToken as {
    me: {
      data: {
        name: string;
      };
    };
  };
  console.log(twitterToken);
  return (
    <Row className="navbarWrapper" justify="space-between" align="middle">
      <Row align="middle">
        <Logo />
        <Typography.Text>{me?.data?.name}</Typography.Text>
      </Row>

      <Button type="default" size="small" danger onClick={logout}>
        Logout
      </Button>
    </Row>
  );
}

export default Navbar;
