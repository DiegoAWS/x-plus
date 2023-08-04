import "./Home.scss";
import HomeImage from "../../assets/HomeImage.png";
import MaskSvg from "../../assets/svg/MaskSvg";
import { Button, Card, Row, Space, Typography } from "antd";
import useMainContext from "../../contexts/useMainContext";
import HomeLeftSide from "../../components/homeLeftSide/HomeLeftSide";
import Logo from "../../assets/Logo";
import { CaretRightOutlined } from "@ant-design/icons";

function Home() {
  const { isDarkTheme } = useMainContext();
  return (
    <div id={isDarkTheme ? "dark" : ""} className="homeWrapper">
      <Card className="whiteContainer" bordered={false}>
        <HomeLeftSide className="leftSide">
          Build teh future of AI together
        </HomeLeftSide>
        <div className="rightSide">
          <MaskSvg className="maskSvg" />

          <Button type="primary" className="start" size="large">
            Get Started
          </Button>

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
