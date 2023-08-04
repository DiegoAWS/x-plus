import { Link } from "react-router-dom";

import { HOME_PATH } from "../../router";
import { Button, Divider, Form, Input, Spin, Typography } from "antd";
import {

  GiftOutlined,
  LeftOutlined,
  LockOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import "./Login.scss";

type Props = {
  signInWithTwitter: () => void;
  isLoading: boolean;
  error?: string;
};

function LoginForm({ signInWithTwitter, isLoading, error }: Props) {
  return (
    <div className="loginWrapper">
      <Spin size="large" spinning={isLoading}>
        <div className="top">
          <Link to={HOME_PATH}>
            <Button icon={  <LeftOutlined />} title="Home">
            
            </Button>
          </Link>
          <Typography.Title level={1}>Sign in</Typography.Title>
          <Button
            icon={
              <TwitterOutlined
                style={{
                  color: "#1DA1F2",
                  fontSize: "1.5rem",
                }}
              />
            }
            type="default"
            size="large"
            block
            onClick={signInWithTwitter}
          >
            <Typography.Text strong>Sign in with Twitter</Typography.Text>
          </Button>
          <Button
            type="default"
            size="large"
            disabled
            block
            icon={
              <GiftOutlined
                style={{
                  fontSize: "1.5rem",
                  color: "#FF4136",
                  marginRight: "1rem",
                }}
              />
            }
          >
            <Typography.Text strong>Demo</Typography.Text>
          </Button>
          <Divider>or</Divider>

          <Form layout="vertical">
            <Form.Item
              name={["email"]}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Your email"
                addonBefore="@"
                size="large"
                type="email"
              />
            </Form.Item>
            <Form.Item
              name={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "Minimum 6 characters",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="password"
                addonBefore={<LockOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name={["submit"]}
              rules={[
                {
                  required: true,
                  message: "Invalid credentials!",
                },
              ]}
              validateStatus={error ? "error" : undefined}
              help={error}
            >
              <Button type="primary" htmlType="submit" size="large" block>
                <Typography.Text strong>Sign in</Typography.Text>
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="bottom">
          <Typography.Text italic>
            This site is protected by reCAPTCHA
          </Typography.Text>
        </div>
      </Spin>
    </div>
  );
}

export default LoginForm;
