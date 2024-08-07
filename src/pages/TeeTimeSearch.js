import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import './TournamentSearch.css';
import TeeTimeBook from './TeeTimeBook';
import { golfCourses } from '../components/GolfTeeTimeData';
import SignIn from './SignIn.js';
import { useNavigate } from 'react-router-dom';


const TeeTimeTypes = ['9 Hole Course', '18 Hole Course', 'Championship Course'];
function TeeTimeSearch() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEarlyTime, setSelectedEarlyTime] = useState('');
    const [selectedLatestTime, setSelectedLatestTime] = useState('');
    const [selectedMinPrice, setSelectedMinPrice] = useState('');
    const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTeeTime, setSelectedTeeTime] = useState(null);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const navigate = useNavigate();

    // Functions to handle the change in the faceted search
    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleEarlyTimeChange = (e) => {
        setSelectedEarlyTime(e.target.value);
    };

    const handleLatestTimeChange = (e) => {
        setSelectedLatestTime(e.target.value);
    };

    const handleMinPriceChange = (e) => {
        setSelectedMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setSelectedMaxPrice(e.target.value);
    };

    const filteredData = golfCourses.filter((item) => {
        const earlyTime = selectedEarlyTime ? new Date(`1970-01-01T${selectedEarlyTime}:00`) : null;
        const latestTime = selectedLatestTime ? new Date(`1970-01-01T${selectedLatestTime}:00`) : null;
        const itemTime = new Date(`1970-01-01T${item.time}:00`);

        return (
            (selectedTypes.length === 0 || selectedTypes.includes(item.name)) &&
            (selectedDate === '' || item.date === selectedDate) &&
            (selectedEarlyTime === '' || itemTime >= earlyTime) &&
            (selectedLatestTime === '' || itemTime <= latestTime) &&
            (selectedMinPrice === '' || Number(item.price) >= Number(selectedMinPrice)) &&
            (selectedMaxPrice === '' || Number(item.price) <= Number(selectedMaxPrice))
        );
    });
    const openTeeTimeBookingModal = (item) => {
        console.log(localStorage.getItem('userUID'))
        if (localStorage.getItem('userUID') != null) {
            setSelectedTeeTime(item);
            setShowBookingModal(true);
        }
        else {
            setShowSignupModal(true);
        }
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
        setSelectedTeeTime(null);
    };

    const handleCloseModal = () => {
        setShowSignupModal(false);
    };



    return (
        <Container>
            <Container className="text-header mt-3">
                <Row className="tournament-heading align-items-center" role="banner">
                    <Col xs="auto">
                        <Button className='back-button' onClick={() => navigate('/Golf-Courses')} aria-label="Back to Home Page">
                            ← Back to Golf Courses
                        </Button>
                    </Col>
                    <Col>
                        <h1>Search For Tee Times</h1>
                    </Col>
                    <Col sm={2}></Col>

                </Row>
            </Container>

            <Form>
                <Row className="mt-4 align-items-start">
                    <Col md={2} className=' mt-5 facted-search border'>
                        <Form.Label className="title mt-4">Tee Time Types</Form.Label>
                        <Container>
                            {TeeTimeTypes.map((name, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    label={name}
                                    className="faceted"
                                    onChange={() => handleTypeChange(name)}
                                    checked={selectedTypes.includes(name)}
                                />
                            ))}
                        </Container>

                        <Form.Label className="title mt-4">Date of Tee Time</Form.Label>
                        <Form.Control type="date" value={selectedDate} onChange={handleDateChange} />

                        <Form.Label className="title mt-4">Earliest Time</Form.Label>
                        <Form.Control type="time" value={selectedEarlyTime} onChange={handleEarlyTimeChange} />

                        <Form.Label className="title mt-4">Latest Time</Form.Label>
                        <Form.Control type="time" value={selectedLatestTime} onChange={handleLatestTimeChange} />

                        <Form.Label className="title mt-4">Min Price</Form.Label>
                        <Form.Control type="number" value={selectedMinPrice} onChange={handleMinPriceChange} />

                        <Form.Label className="title mt-4">Max Price</Form.Label>
                        <Form.Control type="number" value={selectedMaxPrice} onChange={handleMaxPriceChange} />
                    </Col>
                    <Col md={10}>
                        <Row className="mt-4 tee-times">
                            {filteredData.map((item) => (
                                <Col key={item.id} md={6} lg={4} className="mb-4">
                                    <div className="border">
                                        <h5 className="mt-2">{item.name}</h5>
                                        <Container className="search-result-item">
                                            <p>Type: {item.name}</p>
                                            <p>Date: {item.date}</p>
                                            <p>Time: {item.time}</p>
                                            <p>Price: ${item.price}</p>
                                        </Container>
                                        <Button className="book mb-3" onClick={() => openTeeTimeBookingModal(item)}>
                                            Book a Tee Time
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Form>
            <Modal show={showBookingModal} onHide={closeBookingModal}>
                <Modal.Header closeButton onClick={handleCloseModal}>
                    <Modal.Title>Book Tee Time</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeeTimeBook teeTime={selectedTeeTime}></TeeTimeBook>
                </Modal.Body>
            </Modal>
            <SignIn show={showSignupModal} handleClose={handleCloseModal} />
        </Container>
    );
}

export default TeeTimeSearch;
