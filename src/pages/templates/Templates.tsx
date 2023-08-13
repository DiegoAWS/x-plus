import { Button, Card, Col, Divider, Form, Input, Row, Space } from "antd";

function Templates() {
  const [form] = Form.useForm();

  const handleFormFinish = (values: Record<string, string>) => {
    console.log(values);
  };

  return (
    <Row gutter={[20, 20]}>
      <Col sm={24} md={12}>
        <Card>
          <Form layout="vertical" form={form} onFinish={handleFormFinish}>
            <Form.Item
              name={["tweet"]}
              label="Template twitt"
              rules={[
                {
                  required: true,
                  message: "Please input your template twitt!",
                },
              ]}
            >
              <Input.TextArea
                name="tweet"
                className="templateArea"
                placeholder="Please type your template twitt....."
                rows={4}
                showCount
                maxLength={280}
                autoSize={{ minRows: 4, maxRows: 8 }}
              />
            </Form.Item>
            <Form.Item
              name={["title"]}
              label="Template title"
              rules={[
                {
                  required: true,
                  message: "Please input your template title!",
                },
              ]}
            >
              <Input name="title" placeholder="Add a remarkable title" />
            </Form.Item>
            <Divider />
            <Space>
              <Button type="dashed"  htmlType="button" disabled> New</Button>
              <Button htmlType="reset">Clear</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form>
        </Card>
      </Col>
      <Col sm={24} md={12}>
        <Card></Card>
      </Col>
      <Col sm={24} md={12}>
        <Card>List of templates</Card>
      </Col>
    </Row>
  );
}

export default Templates;
