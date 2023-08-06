import { Menu, type MenuProps } from "antd";

import useMainContext from "../../contexts/useMainContext";
import { HOME_PATH } from "../../router";
import { routes } from "../../router";

function NavigationMenu() {
  const { isDarkTheme } = useMainContext();

  const items = (routes.find(({ path }) => path === HOME_PATH)?.children || [])
    .filter(({ title }) => Boolean(title))
    .map(({ title, path, icon }) => ({
      key: path,
      label: title,
      icon,
      onClick: () => {
        console.log({
          title,
          path,
        });
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
