import { Card, Typography } from "antd";
import "./Dashboard.scss";
import Navbar from "../../components/navbar/Navbar";
import useMainContext from "../../contexts/useMainContext";

function Dashboard() {
  const { isDarkTheme } = useMainContext();
  return (
    <div className="dashboardWrapper" id={isDarkTheme ? "dark" : undefined}>
      <Navbar />
      <Typography.Title level={2} className="title">Dashboard</Typography.Title>
      <div className="dashboardContent">
      
      
{
  new Array(100).fill(0).map((_, index) => (
    <Card title="Card title" key ={index}>
        <img src={`https://picsum.photos/seed/${index+1}/600/500`} alt="profile" />
        </Card>
  ))
}
      
      </div>
    </div>
  );
}

export default Dashboard;
