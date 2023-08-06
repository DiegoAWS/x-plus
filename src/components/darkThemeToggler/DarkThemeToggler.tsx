import { Grid, Segmented } from "antd";
import SunIcon from "../../assets/svg/SunIcon";
import MoonIcon from "../../assets/svg/MoonIcon";
import useMainContext from "../../contexts/useMainContext";
import "./DarkThemeToggler.scss";
type Props = {
  isCollapsed: boolean;
};

function DarkThemeToggler({ isCollapsed }: Props) {
  const { isDarkTheme, setDarkTheme } = useMainContext();
  const { xl } = Grid.useBreakpoint();

  return isCollapsed && !xl ? (
    isDarkTheme ? (
      <SunIcon />
    ) : (
      <MoonIcon />
    )
  ) : (
    <Segmented
      className="darkThemeToggler"
      block
      onChange={(value) =>  setDarkTheme(value === "dark")}
      value={isDarkTheme ? "dark" : "light"}
      size="large"
      options={[
        {
          label: "Light",
          value: "light",
          icon: <SunIcon />,
        },
        {
          label: "Dark",
          value: "dark",
          icon: <MoonIcon />,
        },
      ]}
    />
  );
}

export default DarkThemeToggler;
