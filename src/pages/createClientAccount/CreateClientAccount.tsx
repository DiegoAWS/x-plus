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

function CreateClientAccount() {
  const [form] = Form.useForm();
  const { signInWithTwitter, isLoading, error } = useLogin();

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
     toast.error('You can only upload JPG/PNG file!');
     return false;
     
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error('Image must smaller than 2MB!');
      return false;
    }
    return isJpgOrPng && isLt2M;
  };

  const onChange:UploadProps['onChange'] = async ({file}) => {

    if ((file.status === "done")) {
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });

      form.setFieldsValue({
        logo: src,
      });
    }
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
          initialValues={{
            companyName: "Lorem Ipsum LCC",
          }}
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
                customRequest={({ onSuccess }) => {
                
                  onSuccess && onSuccess(true);
                }}
                listType="picture-card"
                beforeUpload={beforeUpload}
                
                onChange={onChange}
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
