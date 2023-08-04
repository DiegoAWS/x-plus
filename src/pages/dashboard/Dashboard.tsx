import { Button, Typography } from "antd";
import useMainContext from "../../contexts/useMainContext";

function Dashboard() {
  const { twitterToken, logout } = useMainContext();
  console.log(twitterToken);
  return <div>

    <Typography.Title level={1}>Dashboard</Typography.Title>

<Button type="primary" danger onClick={logout}>Logout</Button>
  </div>;
}

export default Dashboard;
