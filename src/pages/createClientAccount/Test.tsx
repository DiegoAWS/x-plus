import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { toast } from "react-toastify";
import { uploadImage } from "../../services/imagesS3";

function Test() {
    
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
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const onChange:UploadProps['onChange'] = async () => {

    // if ((file.status === "done")) {
    //   const src = await new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file.originFileObj as RcFile);
    //     reader.onload = () => resolve(reader.result as string);
    //   });

    //   form.setFieldsValue({
    //     logo: src,
    //   });

    
    // }
  }


  return (
    <ImgCrop>
    <Upload
      style={{
        margin: "auto",
      }}
      maxCount={1}
      name="logo"
      customRequest={async({ onSuccess, file }) => {

       await uploadImage(file as RcFile)
      
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
  );
}

export default Test;
