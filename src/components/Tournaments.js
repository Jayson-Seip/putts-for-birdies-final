import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Tournaments.css'
import { useTranslation } from 'react-i18next';

function Tournaments() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/tournaments');
    };

    return (
        <Container className="tournament-container mt-5">
            <Row>
                <Col sm={5} className="Image">
                    <Image src={process.env.PUBLIC_URL + "/images/thumb_IMG_0450_1024_large.jpg"} className="custom-image" />
                </Col>
                <Col sm={7} className="Information d-flex justify-content-center align-items-center">
                    <div className="Tournament-Info">
                        <Container className="text-header"><h1>{t('tournaments')}</h1></Container>

                        <p>{t('tournamentsText')}</p>
                        <Button className="info-button" onClick={handleButtonClick}>{t('moreInformation')}</Button>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}
export default Tournaments;