import {  Space, Typography, type SpaceProps, Button } from "antd";
import "./HomeLeftSide.scss";
import Logo from "../../assets/Logo";

function HomeLeftSide({ className, ...rest }: SpaceProps) {
  return (
    <Space
      direction="vertical"
      className={`homeLeftSideWrapper ${className ?? ""}`}
      {...rest}
    >
      <Logo />

      <Typography.Title level={1} className="bigText">
        Building the future of X together
      </Typography.Title>
      <Typography.Text>
        Al is transforming the world, and we are leading the charge. We are
        constructing the future of Al as a collective.
      </Typography.Text>

      <Button type="primary" className="start" size="large">
        Get Started
      </Button>
    </Space>
  );
}

export default HomeLeftSide;
