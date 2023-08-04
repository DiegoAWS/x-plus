import "./Home.scss";
import HomeImage from "../../assets/HomeImage.png";
import MaskSvg from "../../assets/svg/MaskSvg";
import { Button, Card, Row, Space, Typography } from "antd";
import useMainContext from "../../contexts/useMainContext";
import HomeLeftSide from "../../components/homeLeftSide/HomeLeftSide";
import Logo from "../../assets/Logo";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../router";
import SunIcon from "../../assets/svg/SunIcon";
import MoonIcon from "../../assets/svg/MoonIcon";

function Home() {
  const { isDarkTheme, setDarkTheme } = useMainContext();
  return (
    <div id={isDarkTheme ? "dark" : ""} className="homeWrapper">
      <Button
        icon={isDarkTheme ? <SunIcon /> : <MoonIcon />}
        onClick={() => setDarkTheme(!isDarkTheme)}
        className="themeButtonToggler"
        size="large"
        title={isDarkTheme ? "Light Mode" : "Dark Mode"}
        
      />
      <Card className="whiteContainer" bordered={false}>
        <HomeLeftSide className="leftSide">
          Build teh future of AI together
        </HomeLeftSide>
        <div className="rightSide">
          <MaskSvg className="maskSvg" />
          <Link to={LOGIN_PATH}>
            <Button type="primary" className="getStarterButton" size="large">
              Get Started
            </Button>
          </Link>
          <Row
            justify="space-between"
            align="middle"
            className="bottomSearchBar"
          >
            <Space>
              <Logo />
              <Typography.Text italic>AI is generating...</Typography.Text>
            </Space>

            <Button type="default" disabled>
              Publish <CaretRightOutlined />
            </Button>
          </Row>
        </div>
      </Card>
      <img src={HomeImage} alt="HomeImage" className="backImage" />
    </div>
  );
}

export default Home;
