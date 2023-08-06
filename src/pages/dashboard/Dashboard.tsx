import { Typography, theme } from "antd";
import "./Dashboard.scss";

function Dashboard() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div
        className="cardWrapper"
        style={{
          background: colorBgContainer,
        }}
      >
        <Typography.Title level={3}>Welcome to -PLUS</Typography.Title>
      </div>
    </>
  );
}

export default Dashboard;
