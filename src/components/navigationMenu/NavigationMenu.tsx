import { Menu, type MenuProps } from 'antd'

import useMainContext from '../../contexts/useMainContext';
import { routes } from '../../router';


function NavigationMenu() {
    const { isDarkTheme } = useMainContext();

    const items: MenuProps['items'] = routes.filter(({title})=>Boolean(title)).map(({title, path, icon})=>({
        key: path,
        label: title,
        icon,
        onClick: ()=>{}
    }));

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