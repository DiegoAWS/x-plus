import { Row, Col, Card } from "antd";
import TemplateForm from "../../components/templateForm/TemplateForm";
import TemplateList from "../../components/templateList/TemplateList";

function Template() {
    const handleFormFinish = (values: Record<string, string>) => {
        console.log(values);
    };

    return (
        <Row gutter={[20, 20]}>
            <Col sm={24} md={12}>
                <Card>
                    <TemplateForm handleFormFinish={handleFormFinish} />
                </Card>
            </Col>
            <Col sm={24} md={12}>
                <Card></Card>
            </Col>
            <Col sm={24} md={12}>
                <Card>
                    <TemplateList />
                </Card>
            </Col>
        </Row>
    );
}

export default Template;
