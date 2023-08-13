import { Button, Form, Input, Divider, Space } from "antd";

interface TemplateFormProps {
    handleFormFinish: (values: Record<string, string>) => void;
}

function TemplateForm({ handleFormFinish }: TemplateFormProps) {
    const [form] = Form.useForm();

    return (
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
                <Button type="dashed" htmlType="button" disabled>
                    New
                </Button>
                <Button htmlType="reset">Clear</Button>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Space>
        </Form>
    );
}

export default TemplateForm;
