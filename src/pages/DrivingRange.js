import { Container, Row, Col, Image } from "react-bootstrap";
import "./DrivingRange.css"
function DrivingRange() {
    return (
        <Container fluid className="range-container mt-5">
            <Row className="Row1">
                <Col md={6} className=" order-1 order-md-2">
                    <Image src={process.env.PUBLIC_URL + "/images/Driving-Range.jpg"} className="Image-range" />
                </Col>
                <Col md={6} className="Information d-flex justify-content-center  order-2 order-ms-1">
                    <div className="range-info">
                        <Container className="text-header"><h1>Driving Range</h1></Container>

                        <p>Step onto our expansive driving range and elevate your golfing prowess amidst a backdrop of serene landscapes. Perfect your swing with premium golf balls and professional guidance, ensuring every shot reaches its potential. Our facility offers a welcoming environment for golfers of all levels, whether you're practicing for competition or simply enjoying the sport. Experience the joy of improvement in every session at our renowned driving range, where dedication meets exceptional coaching and scenic tranquility.</p>
                        <h6> Overview of Features</h6>
                        <ul>
                            <li> 40 Different Driving spots avilable on a first come first serve basis</li>
                            <li><strong>Proximity Markers:</strong> Perfect your distance control with clearly marked targets at varying distances.</li>
                            <li><strong>Covered and Open-Air Bays:</strong> Practice comfortably rain or shine with our covered and open-air driving bays.</li>
                            <li><strong>Golf Balls:</strong> Practice with high-quality golf balls for optimal performance. Prices start at just $10 per bucket (50 Golf Balls).</li>
                            <li><strong>Club Rental:</strong> $35/Hour</li>
                        </ul>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}
export default DrivingRange;