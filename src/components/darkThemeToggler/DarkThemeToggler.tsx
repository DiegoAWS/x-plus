import { Button, Space } from "antd";
import SunIcon from "../../assets/svg/SunIcon";
import MoonIcon from "../../assets/svg/MoonIcon";
import useMainContext from "../../contexts/useMainContext";

function DarkThemeToggler() {
  const { isDarkTheme, setDarkTheme } = useMainContext();
  return (
    <Space direction="horizontal">
      <Button
        icon={<SunIcon />}
        shape="round"
        disabled={!isDarkTheme}
        onClick={() => setDarkTheme(false)}
      >
        Light
      </Button>
      <Button
        icon={<MoonIcon />}
        disabled={isDarkTheme}
        onClick={() => setDarkTheme(true)}
        shape="round"
      >
        Dark
      </Button>
    </Space>
  );
}

export default DarkThemeToggler;
