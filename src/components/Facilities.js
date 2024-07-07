import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Facilities.css'

function Facilities() {
    const navigate = useNavigate();
    const handleCourseButtonClick = () => {
        navigate('/Golf-Courses');
    };

    const handleDrivingRangeButtonClick = () => {
        navigate('/Driving-Range');
    };
    const handlePuttingButtonClick = () => {
        navigate('/Putting-Green');
    };
    return (
        <Container fluid className="facilities mt-4">
            <Container className="text-header">
                <h1> Our Facilites</h1>
            </Container>
            <Row className="facilities-grid mt-4">
                <Col sm={4}>
                    <Image src="images\golfcourse.jpg" className="facility-image" />
                    <h2>Golf Courses</h2>
                    <p>Explore three distinct courses offering varied challenges and stunning vistas for golfers of all levels.</p>
                    <Button className="info-button" onClick={handleCourseButtonClick}>More Information</Button>
                </Col>
                <Col sm={4}>
                    <Image src="\images\Driving-Range.jpg" className="facility-image" />
                    <h2>Driving Range</h2>
                    <p>Explore three distinct courses offering varied challenges and stunning vistas for golfers of all levels.</p>
                    <Button className="info-button" onClick={handleDrivingRangeButtonClick}>More Information</Button>
                </Col>
                <Col sm={4}>
                    <Image src="images\PuttingGreen.jpg" className="facility-image" />
                    <h2>Putting/Chipping Green</h2>
                    <p>Explore three distinct courses offering varied challenges and stunning vistas for golfers of all levels..</p>
                    <Button className="info-button" onClick={handlePuttingButtonClick}>More Information</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Facilities;
