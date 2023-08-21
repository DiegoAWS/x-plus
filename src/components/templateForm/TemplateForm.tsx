import {
  Button,
  Form,
  Input,
  Divider,
  Space,
  Switch,
  Typography,
  DatePicker,
  Select,
} from "antd";
import type { TemplateFormType, TemplateType } from "../../types";
import { useState } from "react";

type Props = {
  handleFormFinish: (values: TemplateType) => void;
};

function TemplateForm({ handleFormFinish }: Props) {
  const [form] = Form.useForm();

  const [isVisibleScheduler, setIsVisibleScheduler] = useState(true);

  const handleFormFinishHandler = (values: TemplateFormType) => {
    handleFormFinish({
      ...values,
      scheduleTime: values.scheduleTime?.format(),
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFormFinishHandler}
      initialValues={{
        schedule: "once",
        scheduleTime: null,
      }}
    >
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
      <Form.Item name={["name"]} label="Template title">
        <Input name="name" placeholder="Add a remarkable title" />
      </Form.Item>
      <Divider />

      <Space>
        <Switch
          checked={isVisibleScheduler}
          onChange={(enabled) => setIsVisibleScheduler(enabled)}
          size="small"
        />
        <Typography.Text>Add template to a schedule</Typography.Text>
      </Space>

      {isVisibleScheduler && (
        <>
          <Divider />

          <Form.Item name="scheduleTime" label="Time to tweet">
            <DatePicker
              use12Hours
              showNow={false}
              showTime={{ format: "hh:00 A" }}
              format={"DD MMMM YYYY  -  HH:00 A"}
              onOk={(value) => {
                form.setFieldsValue({ scheduleTime: value });
              }}
            />
          </Form.Item>

          <Form.Item name="schedule" label="Repeat Schedule">
            <Select
              onChange={(value) => {
                form.setFieldsValue({ schedule: value });
              }}
              options={[
                { value: "once", label: "Once" },
                { value: "daily", label: "Daily" },
                {
                  value: "weekly",
                  label: "Weekly",
                },
                {
                  value: "monthly",
                  label: "Monthly",
                },
              ]}
            />
          </Form.Item>
        </>
      )}
      <Divider />
      <Space>
        <Button htmlType="reset">Clear</Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Space>
    </Form>
  );
}

export default TemplateForm;
