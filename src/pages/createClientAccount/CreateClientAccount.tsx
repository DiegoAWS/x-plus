import useLogin from "../../hooks/useLogin.ts";
import { Button, Card, Divider, Form, Input, Spin, Typography } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
// import "./CreateClientAccount.scss";

function CreateClientAccount() {
  const { signInWithTwitter, isLoading, error } = useLogin();

  return (
    <Card>
      <Spin size="large" spinning={isLoading}>
        <Typography.Title level={5}>
          Let's first link your organization with his twitter account... 🚀
        </Typography.Title>
        <Divider />
        <Form layout="vertical"
        initialValues={{
          companyName: "Lorem Ipsum LCC",
        }}
        onFinish={signInWithTwitter}>
          <Form.Item
            name={["companyName"]}
            label="Organization name"
            rules={[
              {
                required: true,
                message: "Please input your organization name!",
              },
              {
                max: 50,
                message: "Maximum 50 characters",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Please type your organization name"
              size="large"
              type="text"
            />
          </Form.Item>
          <Divider />
          <Form.Item
            name={["submit"]}
            validateStatus={error ? "error" : undefined}
            help={error}
          >
            <Button
              icon={
                <TwitterOutlined
                  style={{
                    color: "#1DA1F2",
                    fontSize: "1.5rem",
                  }}
                />
              }
              htmlType="submit"
              type="primary"
              size="large"
              block
            >
              <Typography.Text strong>Link Twitter account</Typography.Text>
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
}

export default CreateClientAccount;
