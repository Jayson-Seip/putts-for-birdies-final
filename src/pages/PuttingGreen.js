import { Container, Image, Button, Row, Col } from "react-bootstrap";
import "./PuttingGreen.css"
function PuttingGreen() {
    return (

        <Container className="lesson-container mt-5">
            <Row className="RowOne">
                <Col sm={5} className="Image order-1 order-md-2">
                    <Image src="\images\PuttingGreen.jpg" className="custom-image" />
                </Col>
                <Col sm={7} className="Information d-flex justify-content-center align-items-center order-2 order-ms-1">
                    <div className="lesson-info">
                        <h1>Putting Green</h1>
                        <p>Welcome to our pristine putting green, where precision meets practice in the heart of our golfing sanctuary. The putting green serves as a focal point for refining your short game skills, from mastering delicate putts to honing your accuracy under varying conditions. Before stepping onto the course, take advantage of our meticulously manicured greens to warm up and fine-tune your stroke. Start with gentle stretches and practice putts to loosen muscles and align your focus. Embrace the tranquility of this serene space as you prepare to navigate the challenges ahead. Whether you're a novice or a seasoned golfer, our putting green offers the perfect venue to sharpen your technique and elevate your game to new heights.</p>

                    </div>
                </Col>
            </Row>
            <Row className="RowTwo mt-5 mb-5">
                <Col sm={7} className="Information d-flex justify-content-center align-items-center order-2 order-ms-1">
                    <div className="lesson-info">
                        <h1>Chipping Green</h1>
                        <p>Step onto our meticulously maintained putting green, where precision and finesse converge in a tranquil oasis dedicated to perfecting your short game. Nestled amidst lush surroundings, our putting green offers a sanctuary for golfers of all levels to sharpen their skills and achieve mastery on the greens. Before you tee off, take advantage of this serene space to warm up and refine your putting technique. Practice your stroke on immaculate surfaces that simulate real course conditions, ensuring you're prepared for any challenge on the course ahead. Whether you're aiming for the perfect putt or simply enjoying the calming ambiance, our putting green promises an essential part of your golfing journey</p>

                    </div>
                </Col>
                <Col sm={5} className="Image order-1 order-md-2">
                    <Image src="\images\Chipping-Green.jpg" className="custom-image" />
                </Col>
            </Row>

        </Container>


    );
}

export default PuttingGreen;