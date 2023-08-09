import { Menu, type MenuProps } from "antd";

import useMainContext from "../../contexts/useMainContext";
// import { HOME_PATH } from "../../router";
// import { routes } from "../../router";
import { useNavigate } from "react-router-dom";

function NavigationMenu() {
  const { isDarkTheme } = useMainContext();
  const navigate = useNavigate();

  const items = []
    .filter(({ title }) => Boolean(title))
    .map(({ title, path, icon }) => ({
      key: path,
      label: title,
      icon,
      onClick: () => {
        navigate(path as string);
      },
    })) as MenuProps["items"];

  return (
    <Menu
      theme={isDarkTheme ? "dark" : "light"}
      mode="inline"
      items={[
        ...(items || []),
        {
          type: "divider",
        },
      ]}
      selectedKeys={["1"]}
    />
  );
}

export default NavigationMenu;
