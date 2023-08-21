import { Card, Space, Button, Modal } from "antd";
import TemplateForm from "../../components/templateForm/TemplateForm";
import TemplateList from "../../components/templateList/TemplateList";
import { templatePath } from "../../services/template";
import useQuery from "../../hooks/useQuery";
import type { TemplateType } from "../../types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";

function Template() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: templatesList,
    isLoading: isLoadingList,
    error: errorList,
    refresh: refreshList,
  } = useQuery<TemplateType[]>({
    path: templatePath,
    method: "GET",
    isArray: true,
    isDisabled: false,
  });

  const {
    data: templateCreate,
    isLoading: isLoadingCreate,
    error: errorCreate,
    refresh: send,
  } = useQuery<unknown, TemplateType>({
    path: templatePath,
    method: "POST",
    isDisabled: true,
  });

  const {
    data: templateDelete,
    isLoading: isLoadingDelete,
    refresh: deleteTemplate,
  } = useQuery<unknown, { id: number }>({
    path: templatePath,
    method: "DELETE",
    isDisabled: true,
  });

  const deleteTemplateHandler = (id: number) => {
    deleteTemplate({ id });
  };

  const handleFormFinish = (values: TemplateType) => {
    setIsModalOpen(false);
    console.log( values)
    send(values);
  };

  const sendTemplateHandler = (id: number) => {
    console.log({ id })
  }

  useEffect(() => {
    if (errorList || errorCreate) {
      toast.error("Something went wrong, please refresh the page.");
    }
  }, [errorList, errorCreate]);

  useEffect(() => {
    if (templateCreate || templateDelete) {
      refreshList();
    }
  }, [templateCreate, refreshList, templateDelete]);

  return (
    <Card>
      <Space direction="vertical">
        <Space>
          <Button onClick={() => setIsModalOpen(true)} loading={isLoadingList} icon={<PlusOutlined />}>
            New
          </Button>
          <Button onClick={() => refreshList()} loading={isLoadingList}>
            Refresh
          </Button>
        </Space>
        <TemplateList
          deleteTemplate={deleteTemplateHandler}
          data={templatesList}
          sendTemplate={sendTemplateHandler}
          isLoading={isLoadingList || isLoadingDelete || isLoadingCreate}
        />
      </Space>
      <Modal
        open={isModalOpen}
        footer={null}
        destroyOnClose
        maskClosable={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <TemplateForm handleFormFinish={handleFormFinish} />
      </Modal>
    </Card>
  );
}

export default Template;
