import {  Row, Space, Typography, type SpaceProps, Button } from "antd";
import "./HomeLeftSide.scss";
import Logo from "../../assets/Logo";

function HomeLeftSide({ className, ...rest }: SpaceProps) {
  return (
    <Space
      direction="vertical"
      className={`homeLeftSideWrapper ${className ?? ""}`}
      {...rest}
    >
      <Row>
        <Logo />
      </Row>
      <Row>
        <Typography.Title level={1} className="bigText">
          Building the future of X together
        </Typography.Title>
        <Typography.Text>
          Al is transforming the world, and we are leading the charge. We are
          constructing the future of Al as a collective.
        </Typography.Text>
      </Row>
      <Row>
        <Button type="primary" className="start" size="large">
        Get Started
        </Button>
      </Row>
    </Space>
  );
}

export default HomeLeftSide;
