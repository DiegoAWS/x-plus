import "./Home.scss";
import HomeImage from "../../assets/HomeImage.png";
import MaskSvg from "../../assets/svg/MaskSvg";
import { Button, Card } from "antd";
import useMainContext from "../../contexts/useMainContext";

function Home() {
  const { isDarkTheme } = useMainContext();
  return (
    <div className={`homeWrapper ${isDarkTheme ? "dark" : ""}`}>
      <Card className="whiteContainer" bordered={false}>
        <div className="leftSide">Build teh future of AI together</div>
        <div className="rightSide">
          <MaskSvg className="maskSvg" />

          <Button type="primary" className="start">
            Get Started
          </Button>
        </div>
      </Card>
      <img src={HomeImage} alt="HomeImage" className="backImage" />
    </div>
  );
}

export default Home;
