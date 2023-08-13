import { Space, Table, Button } from "antd";

import { useEffect } from 'react';
import useQuery from "../../hooks/useQuery";
import { toast } from "react-toastify";
import type { ColumnType } from "antd/es/table";
import type { TemplateType } from "../../types";
export const templatePath = "/.netlify/functions/templates";


export default function TemplateList() {
  const { data, isLoading, error, refresh } = useQuery<TemplateType>({
    path:templatePath,
    method:"GET",
    isDisabled: false,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch templates. Try refreshing.");
    }
  }, [error]);

  const columns: ColumnType<TemplateType>[] = [
    {
      title: "Template Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.name.localeCompare(b.name) 
    },
    {
      title: "Template Twitt",
      dataIndex: "tweet",
      key: "tweet",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        
        console.log (record)
        return (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      )},
    },
  ];

  return (
    <div>
      <Button onClick={()=>refresh()} loading={isLoading}>Refresh</Button>
      <Table
        loading={isLoading}
        columns={columns} 
        dataSource={data} 
        rowKey="id"  // Assuming your TemplateType has an "id" field. Adjust accordingly if not.
      />
    </div>
  );
}
