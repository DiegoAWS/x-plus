import React from "react";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import type { BadgeProps } from "antd";
import { Badge, Button, Calendar, Card, Space } from "antd";
import "./Tasks.scss";
import { PlusOutlined } from "@ant-design/icons";
const getListData = (value: Dayjs) => {
  console.log(value);
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};


const Tasks: React.FC = () => {

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);

    return info.originNode;
  };

  return (
    <Card>
      <Space direction="vertical">
        <Space>
          <Button onClick={() => {}} loading={false} icon={<PlusOutlined />}>
            New
          </Button>
          <Button onClick={() => {}} loading={false}>
            Refresh
          </Button>
        </Space>
        <Calendar
          cellRender={cellRender}
          // style={{
          //   minWidth: "1200px",
          // }}
        />
      </Space>
    </Card>
  );
};

export default Tasks;
