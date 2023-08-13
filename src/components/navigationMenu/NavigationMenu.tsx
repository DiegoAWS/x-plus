import { Menu, type MenuProps } from "antd";

import useMainContext from "../../contexts/useMainContext";
// import { HOME_PATH } from "../../router";
// import { routes } from "../../router";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../router";
import type { XUser } from "../../types";

function NavigationMenu() {
  const { isDarkTheme } = useMainContext();
  const navigate = useNavigate();
  const {pathname} =useLocation();

  const { netlifyIdentity } = useMainContext();


  const user = netlifyIdentity.currentUser() as XUser;
  const companyName = user?.app_metadata?.companyName;

  if (!companyName) {
    return null;
  }

  const navigationItems = routes.find(({ topLevel }) => topLevel)?.children?.filter(({ title }) => Boolean(title)) || [];

  const items = navigationItems
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
      selectedKeys={[pathname]}
      items={[
        ...(items || []),
        {
          type: "divider",
        },
      ]}
    />
  );
}

export default NavigationMenu;
