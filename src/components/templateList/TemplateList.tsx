import { Table, Button, Popconfirm, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import type { TemplateType } from "../../types";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ScheduleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

type Props = {
  data: TemplateType[];
  isLoading: boolean;
  sendTemplate: (id: number) => void;
  deleteTemplate: (id: number) => void;
};
export default function TemplateList({
  data,
  isLoading,
  sendTemplate,
  deleteTemplate,
}: Props) {
  const columns: ColumnType<TemplateType>[] = [
    {
      dataIndex: "name",
      key: "title",
      render: (name: string, { tweet }) => {
        if (name) return name;
        return tweet.length > 20 ? tweet.slice(0, 20) + "..." : tweet;
      },
    },
    {
      width: "50%",
      dataIndex: "tweet",
      key: "tweet",
      ellipsis: true,
    },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        dayjs(createdAt).format("DD MMMM YYYY HH:mm"),
    },
    {
      width: "40px",
      dataIndex: "schedule",
      key: "schedule",
      render: (schedule: string) =>(
        <>
          {schedule === "once" && <ClockCircleOutlined title="Schedule once"/>}
          {schedule && schedule !== "once" && <ScheduleOutlined title={`Schedule ${schedule}`}/>}
          {!schedule && (
            <Button
              disabled
              title="This template is not scheduled"
              type="text"
              icon={<CalendarOutlined />}
            />
          )}
        </>
      ),
    },
    {
      width: "140px",
      key: "id",
      dataIndex: "id",
      render: (id: number) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Button title="Edit" type="text" icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure to delete this template?"
            onConfirm={() => {
              deleteTemplate(id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            disabled
            type="text"
            icon={<SendOutlined />}
            onClick={() => sendTemplate(id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      onRow={(record) => {
        return {
          onClick: () => {
            console.log({ record });
          },
        };
      }}
      showHeader={false}
      pagination={false}
      loading={isLoading}
      columns={columns}
      dataSource={data}
      rowKey="id"
    />
  );
}
