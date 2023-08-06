import { Space, Typography, type SpaceProps, Button } from "antd";
import "./HomeLeftSide.scss";
import Logo from "../../assets/Logo";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../router";

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
      <Typography.Title level={4}>
      🚀 Dive into our dynamic web platform! Our app 📲 lets you craft ✍️ perfect tweet templates 📝, schedule ⏰ and automate 🤖 tweets for your beloved clients ❤️, and even set up recurring Twitter 🐦 magic ✨
      </Typography.Title >
      <Link to={LOGIN_PATH}>
        <Button type="primary" className="start" size="large" shape="round">
          Get Started
        </Button>
      </Link>
    </Space>
  );
}

export default HomeLeftSide;
