import { Menu, type MenuProps } from 'antd'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from "@ant-design/icons";
import { createElement } from 'react';
import useMainContext from '../../contexts/useMainContext';

const items: MenuProps["items"] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: createElement(icon),
    label: `nav ${index + 1}`,
  }));

function NavigationMenu() {
    const { isDarkTheme } = useMainContext();

  return (
    <Menu
    theme={isDarkTheme ? "dark" : "light"}
    mode="inline"
    items={items}
    selectedKeys={["1"]}
  />
  )
}

export default NavigationMenu