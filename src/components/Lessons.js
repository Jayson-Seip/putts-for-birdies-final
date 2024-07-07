import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Lesson.css";

function Lesson() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/lessons');
    };
    return (
        <Container className="lesson-container mt-5">
            <Row className="Row1">
                <Col sm={7} className="Information d-flex justify-content-center align-items-center order-2 order-ms-1">
                    <div className="lesson-info">
                        <Container className="text-header"><h1>Lesson</h1></Container>
                        <p>Ready to improve your swing and boost your confidence on the course? Our experienced instructors provide comprehensive lessons designed for golfers of all abilities. From mastering the basics to perfecting advanced techniques, our personalized coaching will help you achieve your golfing goals. Schedule your session now and see the difference in your game!</p>
                        <Button className="info-button" onClick={handleButtonClick}>More Infomation</Button>
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