import { Container, Image, Button, Row, Col } from "react-bootstrap";
import "./PuttingGreen.css"
import { useNavigate } from 'react-router-dom';
function PuttingGreen() {
    const navigate = useNavigate();
    return (

        <Container className="lesson-container mt-5">
            <Row className="tournament-heading align-items-center" role="banner">
                <Col xs="auto">
                    <Button className='back-button' onClick={() => navigate('/')} aria-label="Back to Home Page">
                        ← Back to Home Page
                    </Button>
                </Col>
                <Col>
                    <h1>Putting and Chipping Green</h1>
                </Col>
                <Col sm={2}></Col>

            </Row>
            <Row className="RowOne mt-4">
                <Col sm={5} className="Image order-1 order-md-2">
                    <Image src={process.env.PUBLIC_URL + "/images/PuttingGreen.jpg"} className="custom-image" />
                </Col>
                {/* Putting Green Information */}
                <Col sm={7} className="Information d-flex justify-content-center align-items-center order-2 order-ms-1">
                    <div className="lesson-info">
                        <h1>Putting Green</h1>
                        <p>Welcome to our pristine putting green, where precision meets practice in the heart of our golfing sanctuary. The putting green serves as a focal point for refining your short game skills, from mastering delicate putts to honing your accuracy under varying conditions. Before stepping onto the course, take advantage of our meticulously manicured greens to warm up and fine-tune your stroke. Start with gentle stretches and practice putts to loosen muscles and align your focus. Embrace the tranquility of this serene space as you prepare to navigate the challenges ahead. Whether you're a novice or a seasoned golfer, our putting green offers the perfect venue to sharpen your technique and elevate your game to new heights.</p>

                    </div>
                </Col>
                {/* Chipping Green Information */}
            </Row>
            <Row className="RowTwo mt-5 mb-5">
                <Col sm={7} className="Information d-flex justify-content-center align-items-center order-2 order-ms-1">
                    <div className="lesson-info">
                        <h1>Chipping Green</h1>
                        <p>Elevate your short game at our meticulously maintained putting green. Designed to simulate real-course conditions, our putting green offers the perfect environment for golfers of all skill levels to practice and refine their putting techniques. Whether you're warming up before a round or spending a dedicated practice session, you'll appreciate the smooth, true roll of our greens. Take advantage of this facility to lower your scores and boost your confidence on the course. Join us today and watch your putting game soar!</p>

                    </div>
                </Col>
                <Col sm={5} className="Image order-1 order-md-2">
                    <Image src={process.env.PUBLIC_URL + "/images/Chipping-Green.jpg"} className="custom-image" />
                </Col>
            </Row>

        </Container>


    );
}

export default PuttingGreen;