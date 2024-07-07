import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SummerCamp.css"
function SummerCamp() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/SummerCamp');
    };
    return (
        <Container className=" mt-5">
            <Row>
                <Col sm={5} className="Image">
                    <Image src="/images/SummerCamp.jpg" className="custom-image" />
                </Col>
                <Col sm={7} className="Information d-flex justify-content-center align-items-center">
                    <div className="Tournament-Info">
                        <h1>Summer Camps</h1>
                        <p>Our summer camps are designed to cater to young golfers of all skill levels, from beginners to advanced players. Led by experienced instructors, our camps focus on developing golf skills, sportsmanship, and a love for the game.</p>
                        <Button onClick={handleButtonClick}>More Infomation</Button>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}
export default SummerCamp;