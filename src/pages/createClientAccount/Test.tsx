import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";

function Test() {
  const onFinishHandler = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form onFinish={onFinishHandler}>
      <Form.Item label="Profile image">
        <Upload accept="image">
            <Button size="large">
                <UploadOutlined />
            </Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}

export default Test;
