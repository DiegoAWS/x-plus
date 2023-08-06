import { Grid, Segmented } from "antd";
import SunIcon from "../../assets/svg/SunIcon";
import MoonIcon from "../../assets/svg/MoonIcon";
import useMainContext from "../../contexts/useMainContext";

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
    onChange={(value) => setDarkTheme(value === "dark")}
    value={!isDarkTheme ? "dark" : "light"}
    size="large"
    options={[
      {
        label: "Light",
        value: "light",
        icon: <SunIcon />,
        // disabled: !isDarkTheme,
      },
      {
        label: "Dark",
        value: "dark",
        icon: <MoonIcon />,
      }
    ]}/>
    // <Space direction="horizontal">
    //   <Button
    //     icon={<SunIcon />}
    //     shape="round"
    //     disabled={!isDarkTheme}
    //     onClick={() => setDarkTheme(false)}
    //   >
    //     Light
    //   </Button>
    //   <Button
    //     icon={<MoonIcon />}
    //     disabled={isDarkTheme}
    //     onClick={() => setDarkTheme(true)}
    //     shape="round"
    //   >
    //     Dark
    //   </Button>
    // </Space>
  );
}

export default DarkThemeToggler;
