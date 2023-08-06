import { Button, Card, Divider, Input } from "antd";
import "./Dashboard.scss";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";

function Dashboard() {
const [twittArea, setTwittArea] = useState('')

  return (
    <>
      <Card className="cardWrapper">
        <Input.TextArea 
        className="twittArea"
        rows={4} 
        showCount
        value={twittArea}
        onChange={(e) => setTwittArea(e.target.value)}
        maxLength={280}
        autoSize={{ minRows: 4, maxRows: 8}}
        />
        <Divider />
        <Button icon={
          <SendOutlined />
        }
        loading={!false}
        disabled={!twittArea}
        />
      </Card>
    </>
  );
}

export default Dashboard;
