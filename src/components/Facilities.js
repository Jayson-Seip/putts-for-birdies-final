import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Facilities.css';
import { useTranslation } from 'react-i18next';

function Facilities() {
    const { t } = useTranslation();

    return (
        <Container fluid className="facilities mt-4">
            <Container className="text-header">
                <h1> {t('OurFacilities')}</h1>
                <h5> {t('facilitiesText')}</h5>
            </Container>
            <Row className="facilities-grid mt-4">
                {/* Driving Range */}
                <Col sm={4}>
                    <Image src={process.env.PUBLIC_URL + "/images/Driving-Range.jpg"} className="facility-image" />
                    <h2>{t('DrivingRange')}</h2>
                    <p className="facility-description">{t('drivingRangeText')}</p>
                    <Link className="info-button" to="/Driving-Range">{t('moreInformation')}</Link>
                </Col>
                {/* Golf Courses */}
                <Col sm={4}>
                    <Image src={process.env.PUBLIC_URL + "/images/golfcourse.jpg"} className="facility-image" />
                    <h2>{t('golfCourses')}</h2>
                    <p className="facility-description">{t('golfCoursesText')}</p>
                    <Link className="info-button" to="/Golf-Courses">{t('moreInformation')}</Link>
                </Col>
                {/* Putting Green */}
                <Col sm={4}>
                    <Image src={process.env.PUBLIC_URL + "/images/PuttingGreen.jpg"} className="facility-image" />
                    <h2>{t('PuttingChippingGreen')}</h2>
                    <p className="facility-description">{t('puttingChippingGreenText')}</p>
                    <Link className="info-button" to="/Putting-Green">{t('moreInformation')}</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Facilities;