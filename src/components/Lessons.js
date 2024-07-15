import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Lesson.css";
import { useTranslation } from 'react-i18next';

function Lesson() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/lessons');
    };
    return (
        <Container className="lesson-container mt-5">
            <Row className="Row1">
                <Col sm={7} className="Information d-flex justify-content-center align-items-center order-2 order-ms-1">
                    <div className="lesson-info">
                        <Container className="text-header"><h1>{t('lesson')}</h1></Container>
                        <p>{t('lessonText')}</p>
                        <Button className="info-button" onClick={handleButtonClick}>{t('moreInformation')}</Button>
                    </div>
                </Col>
                <Col sm={5} className="Image order-1 order-md-2">
                    <Image src={process.env.PUBLIC_URL + "/images/GolfLessonPhoto.jpg"} className="custom-image" />
                </Col>
            </Row>
        </Container>



    );
};

export default Lesson;