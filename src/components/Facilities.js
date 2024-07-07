import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Facilities.css'

function Facilities() {

    return (
        <Container fluid className="facilities mt-4">
            <Container className="text-header">
                <h1> Our Facilites</h1>
                <h5> We offer 3 Great Facilities to enhance your golfing experience</h5>
            </Container>
            <Row className="facilities-grid mt-4">
                <Col sm={4}>
                    <Image src={process.env.PUBLIC_URL + "/images/golfcourse.jpg"} className="facility-image" />
                    <h2>Golf Courses</h2>
                    <p>Explore three distinct courses offering varied challenges and stunning vistas for golfers of all levels.</p>
                    <Link className="info-button" to="/Golf-Courses">More Information</Link>
                </Col>
                <Col sm={4}>
                    <Image src={process.env.PUBLIC_URL + "/images/Driving-Range.jpg"} className="facility-image" />
                    <h2>Driving Range</h2>
                    <p>Explore three distinct courses offering varied challenges and stunning vistas for golfers of all levels.</p>
                    <Link className="info-button" to="/Driving-Range">More Information</Link>
                </Col>
                <Col sm={4}>
                    <Image src={process.env.PUBLIC_URL + "/images/PuttingGreen.jpg"} className="facility-image" />
                    <h2>Putting/Chipping Green</h2>
                    <p>Explore three distinct courses offering varied challenges and stunning vistas for golfers of all levels..</p>
                    <Link className="info-button" to="/Putting-Green">More Information</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Facilities;
