import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SummerCamp.css"
import { useTranslation } from 'react-i18next';

function SummerCamp() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/SummerCamp');
    };
    return (
        <Container className=" mt-5">
            <Row>
                <Col sm={5} className="Image">
                    <Image src={process.env.PUBLIC_URL + "/images/SummerCamp.jpg"} className="custom-image" />
                </Col>
                <Col sm={7} className="Information d-flex justify-content-center align-items-center">
                    <div className="Tournament-Info">
                        <Container className="text-header"><h1>{t('summerCamp')}</h1></Container>
                        <p>{t('summerCampText')}</p>
                        <Button className="info-button" onClick={handleButtonClick}>{t('moreInformation')}</Button>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}
export default SummerCamp;