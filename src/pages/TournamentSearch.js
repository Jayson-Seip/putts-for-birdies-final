
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import './TournamentSearch.css'
import BookingTournamentPage from './BookingTournamentPage';
import { tournaments } from '../components/TournamentData.js';


const TournamentType = ['Charity', 'Junior', 'Senior', 'Stroke Play', 'Scramble', 'Night Golf'];
const Levels = ['Beginner', 'Intermediate', 'Advance'];
// Mock Data



function TournamentSearch() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEarlyTime, setSelectedEarlyTime] = useState('')
    const [selectedLatestTime, setSelectedLatestTime] = useState('')
    const [selectedMinPrice, setSelectedMinPrice] = useState('');
    const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false)

    // Functions to handle the change in the facted search
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            // if category is in the list then it is removed, else it is added
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };
    const handleLevelChange = (level) => {
        setSelectedLevel((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]);
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



    const filteredData = tournaments.filter((item) => {
        const earlyTime = selectedEarlyTime ? new Date(`1970-01-01T${selectedEarlyTime}:00`) : null;
        const latestTime = selectedLatestTime ? new Date(`1970-01-01T${selectedLatestTime}:00`) : null;
        const itemTime = new Date(`1970-01-01T${item.time}:00`);

        return (
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            (selectedLevel.length === 0 || selectedLevel.includes(item.level)) &&
            (selectedDate === '' || item.date === selectedDate) &&
            (selectedEarlyTime === '' || itemTime >= earlyTime) &&
            (selectedLatestTime === '' || itemTime <= latestTime) &&
            (selectedMinPrice === '' || Number(item.price) >= Number(selectedMinPrice)) &&
            (selectedMaxPrice === '' || Number(item.price) <= Number(selectedMaxPrice))
        );
    });

    const openBookingModal = () => {
        setShowBookingModal(true);
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
    };

    return (
        <Container>
            <h1>Search for Tournament</h1>
            <Form>

                <Row className="mt-4">

                    <Col md={2} className=' facted-search border'>
                        <Form.Label className='title'>Tournament Type</Form.Label>
                        <Container /*Displays the different types of Tournamaners that can be searched */>
                            {TournamentType.map((label, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    label={label}
                                    className="facted"
                                    onChange={() => handleCategoryChange(label)}
                                    checked={selectedCategories.includes(label)}
                                />
                            ))}
                        </Container>

                        <Form.Label className='title mt-4'>Level</Form.Label>
                        <Container>
                            {Levels.map((level, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    label={level}
                                    className="facted"
                                    onChange={() => handleLevelChange(level)}
                                    checked={selectedLevel.includes(level)}
                                />

                            ))}
                        </Container>
                        <Form.Label className='title mt-4'>Date of Tournament</Form.Label>
                        <Form.Control type="date" value={selectedDate} onChange={handleDateChange}></Form.Control>

                        <Form.Label className='title mt-4'>Earliest Time</Form.Label>
                        <Form.Control type="time" value={selectedEarlyTime} onChange={handleEarlyTimeChange}></Form.Control>

                        <Form.Label className='title mt-4'>Latest Time</Form.Label>
                        <Form.Control type="time" value={selectedLatestTime} onChange={handleLatestTimeChange}></Form.Control>

                        <Form.Label className='title mt-4'>Min Price</Form.Label>
                        <Form.Control type="number" value={selectedMinPrice} onChange={handleMinPriceChange}></Form.Control>
                        <Form.Label className='title mt-4'>Max Price</Form.Label>
                        <Form.Control type="number" value={selectedMaxPrice} onChange={handleMaxPriceChange}></Form.Control>

                    </Col>
                    <Col md={10}>
                        <Row className="mt-4 tournaments">
                            {filteredData.map((item) => (
                                <Col key={item.id} md={6} lg={4} className="mb-4">
                                    <div className="border">
                                        <h5 className='mt-2'>{item.name}</h5>
                                        <Container className='search-result-item'>
                                            <p>Category: {item.category}</p>
                                            <p>Skill Level: {item.level}</p>
                                            <p>Date: {item.date}</p>
                                            <p>Time: {item.time}</p>
                                            <p>Price: ${item.price}</p>
                                        </Container>
                                        <Button className="book-btn mb-3" onClick={openBookingModal} >Book a Spot</Button>


                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Form>
            <Modal show={showBookingModal} onHide={closeBookingModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Tournament</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BookingTournamentPage onClose={closeBookingModal} tournaments={tournaments} />
                </Modal.Body>
            </Modal>
        </Container >
    );
}


export default TournamentSearch;