// import { Navigate } from "react-router-dom";
// import useMainContext from "../../contexts/useMainContext.tsx";
import useLogin from "../../hooks/useLogin.ts";
import { Button, Divider, Form, Input, Spin, Typography } from "antd";
import { TwitterOutlined } from "@ant-design/icons";

// import { HOME_PATH } from "../../router.tsx";

function CreateClientAccount() {
  const { signInWithTwitter, isLoading, error } = useLogin();
  // const { twitterToken } = useMainContext();

  // if (twitterToken) {
  //   return <Navigate to={HOME_PATH} />;
  // }
  return (
    <div className="createClientAccountWrapper">
      <Spin size="large" spinning={isLoading}>
        <div className="top">
          <Typography.Title level={2}>Create a client account</Typography.Title>

          <Form layout="vertical">
            <Form.Item
              name={["CompanyName"]}
              rules={[
                {
                  max: 50,
                  message: "Maximum 50 characters",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Company Name" size="large" type="text" />
            </Form.Item>

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
                type="default"
                size="large"
                block
                onClick={()=>signInWithTwitter()}
              >
                <Typography.Text strong>Link Twitter account</Typography.Text>
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Divider />
        <div className="bottom">
          <Typography.Text italic>
            This site is protected by reCAPTCHA
          </Typography.Text>
        </div>
      </Spin>
    </div>
  );
}

export default CreateClientAccount;
