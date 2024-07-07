import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Tournaments.css'
function Tournaments() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/tournaments');
    };
    return (
        <Container className="tournament-container mt-5">
            <Row>
                <Col sm={5} className="Image">
                    <Image src="images/thumb_IMG_0450_1024_large.jpg" className="custom-image" />
                </Col>
                <Col sm={7} className="Information d-flex justify-content-center align-items-center">
                    <div className="Tournament-Info">
                        <h1>Tournaments</h1>
                        <p>At Putts For Birdies, we host a variety of exciting golf tournaments throughout the year, catering to all skill levels. Our tournaments are designed to provide a competitive yet enjoyable experience for all participants. Whether you're a seasoned golfer or just starting out, our tournaments offer the perfect opportunity to showcase your skills, meet fellow golf enthusiasts, and enjoy the beautiful course.</p>
                        <Button onClick={handleButtonClick}>More Infomation</Button>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}
export default Tournaments;