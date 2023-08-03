import {  Col, Row, Space, Typography, type SpaceProps } from "antd";
import "./HomeLeftSide.scss";
import Logo from "../../assets/Logo";
// import Logo from "../../assets/logo.png";

function HomeLeftSide({ className, ...rest }: SpaceProps) {
  return (
    <Space
      direction="vertical"
      className={`homeLeftSideWrapper ${className ?? ""}`}
      {...rest}
    >
      <Row>
        <Col span={2}>
        <Logo />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Typography.Title level={1} className="bigText" >
            Building the future of AI together
          </Typography.Title>
        </Col>
      </Row>
    </Space>
  );
}

export default HomeLeftSide;
