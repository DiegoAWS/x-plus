import { Table, Button, Popconfirm, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import type { TemplateType } from "../../types";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";

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
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      width: "100px",
      key: "id",
      dataIndex: "id",
      render: (id: number) => (
        <Space onClick={(e) => e.stopPropagation()}>
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
          <Button disabled type="text" icon={<SendOutlined />} onClick={()=>sendTemplate(id)}/>
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
