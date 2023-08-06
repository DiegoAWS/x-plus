import { Button, Row, Space, Typography } from "antd";
import MaskSvg from "../../assets/svg/MaskSvg";
import Logo from "../../assets/Logo";
import { CaretRightOutlined } from "@ant-design/icons";
import useMainContext from "../../contexts/useMainContext";


function HomeRightSide() {
  const {netlifyIdentity} = useMainContext();
  return (
    <div className="rightSide">
      <MaskSvg className="maskSvg" />

      <Button
        type="primary"
        className="getStarterButton"
        size="large"
        onClick={() => {
          netlifyIdentity.open();
        }}
      >
        Get Started
      </Button>

      <Row justify="space-between" align="middle" className="bottomSearchBar">
        <Space>
          <Logo />
          <Typography.Text italic>AI is generating.....</Typography.Text>
        </Space>

        <Button type="default" disabled>
          Publish <CaretRightOutlined />
        </Button>
      </Row>
    </div>
  );
}

export default HomeRightSide;
