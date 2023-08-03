import { Avatar, type AvatarProps } from "antd";
import LogoImage from "./logo.png";
import useMainContext from "../contexts/useMainContext";

function Logo(props: AvatarProps) {
    const {isDarkTheme} = useMainContext();
  return <Avatar shape="square" size="large" src={LogoImage} {...props} style={{
    ...(props.style ?? {}),
    ...(isDarkTheme ? {filter: "invert(1)"} : {})
  }} />;
}

export default Logo;
