import { Table, Button, Popconfirm } from "antd";
import type { ColumnType } from "antd/es/table";
import type { TemplateType } from "../../types";
import { DeleteOutlined } from "@ant-design/icons";

type Props = {
  data: TemplateType[];
  isLoading: boolean;

  deleteTemplate: (id: number) => void;
};
export default function TemplateList({
  data,
  isLoading,
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
      width: "50px",

      key: "id",
      dataIndex: "id",
      render: (value) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Are you sure to delete this template?"
            onConfirm={() => {
              deleteTemplate(value);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
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
