import { Space, Typography, type SpaceProps, Button } from "antd";
import "./HomeLeftSide.scss";
import Logo from "../../assets/Logo";
import useMainContext from "../../contexts/useMainContext";

function HomeLeftSide({ className, ...rest }: SpaceProps) {
  const { netlifyIdentity } = useMainContext();
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
      <Typography.Title level={4}>
        🚀 Dive into our dynamic web platform! Our app 📲 lets you craft ✍️
        perfect tweet templates 📝, schedule ⏰ and automate 🤖 tweets for your
        beloved clients ❤️, and even set up recurring Twitter 🐦 magic ✨
      </Typography.Title>

      <Button
        type="primary"
        className="start"
        size="large"
        onClick={() => {
          netlifyIdentity.open();
        }}
      >
        Get Started
      </Button>
    </Space>
  );
}

export default HomeLeftSide;
