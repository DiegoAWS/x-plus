import useLogin from "../../hooks/useLogin.ts";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Spin,
  Typography,
  Upload,
  type UploadFile,
} from "antd";
import { TwitterOutlined, UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import { toast } from "react-toastify";
import useMainContext from "../../contexts/useMainContext.tsx";
import { uploadImage } from "../../services/uploadImage.ts";
import { useEffect } from "react";

function CreateClientAccount() {
  const { netlifyIdentity } = useMainContext();
  const { signInWithTwitter, isLoading, error, dataLogin } = useLogin();
  const [form] = Form.useForm();

  const onPreview = async (file: UploadFile) => {
    const src = file.response;
    const image = new Image();
    image.style.width = "100vmin";
    image.style.marginInline = "auto";
    image.style.display = "block";
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
      return false;
    }
    return isLt2M;
  };

  const customRequestHandler: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
  }) => {
    const user = netlifyIdentity.currentUser()!;
    const uploadFile = file as RcFile;

    const url = await uploadImage(uploadFile, user).catch((err) => {
      console.log(err);
    });
    onSuccess && onSuccess(url);
  };

  const onChangeHandler: UploadProps["onChange"] = (info) => {
    if (info.file.status === "done") {
      form.setFieldsValue({ logo: info.file.response });
    }
    if (info.file.status === "removed") {
      form.setFieldsValue({ logo: null });
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (dataLogin) {
      toast.success("Registration completed successfully");

      timer = setTimeout(() => {
        netlifyIdentity.logout();
      }, 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dataLogin, netlifyIdentity]);

  if (dataLogin) {
    return null;
  }

  return (
    <Card>
      <Spin size="large" spinning={isLoading}>
        <Typography.Title level={5}>
          Let's first link your organization with his twitter account... 🚀
        </Typography.Title>
        <Divider />
        <Form
          form={form}
          layout="vertical"
          onFinish={signInWithTwitter}
        >
          <Form.Item name={["logo"]} label="Organization logo">
            <ImgCrop>
              <Upload
                style={{
                  margin: "auto",
                }}
                maxCount={1}
                name="logo"
                customRequest={customRequestHandler}
                listType="picture-card"
                beforeUpload={beforeUpload}
                onChange={onChangeHandler}
                onPreview={onPreview}
              >
                <UploadOutlined style={{ fontSize: "2rem" }} />
              </Upload>
            </ImgCrop>
          </Form.Item>
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
