import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import './TournamentSearch.css'; // Assuming you have custom CSS for styling
import TeeTimeBook from './TeeTimeBook';
import { golfCourses } from '../components/GolfTeeTimeData'; // Assuming you have imported teeTimes data

const TeeTimeTypes = ['9 Hole Course', '18 Hole Course', 'Championship Course']; // Different types of tee-times available

function TeeTimeSearch() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEarlyTime, setSelectedEarlyTime] = useState('');
    const [selectedLatestTime, setSelectedLatestTime] = useState('');
    const [selectedMinPrice, setSelectedMinPrice] = useState('');
    const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

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

    const openTeeTimeBookingModal = () => {
        setShowBookingModal(true);
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
    };

    return (
        <Container>
            <Container className="text-header mt-3"><h1>Search for Tee Times</h1></Container>

            <Form>
                <Row className="mt-4">
                    <Col md={2} className="faceted-search border">
                        <Form.Label className="title">Tee Time Types</Form.Label>
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
                                        <Button className="book mb-3" onClick={openTeeTimeBookingModal}>
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
                <Modal.Header closeButton>
                    <Modal.Title>Book Tee Time</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeeTimeBook></TeeTimeBook>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default TeeTimeSearch;
