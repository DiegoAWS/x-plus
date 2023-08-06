import "./Home.scss";
import HomeImage from "../../assets/HomeImage.png";
import { Button, Card } from "antd";
import useMainContext from "../../contexts/useMainContext";
import HomeLeftSide from "../../components/homeLeftSide/HomeLeftSide";
import SunIcon from "../../assets/svg/SunIcon";
import MoonIcon from "../../assets/svg/MoonIcon";
import HomeRightSide from "../../components/homeRightSide/HomeRightSide";

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
        <HomeRightSide />
      </Card>
      <img src={HomeImage} alt="HomeImage" className="backImage" />
    </div>
  );
}

export default Home;
