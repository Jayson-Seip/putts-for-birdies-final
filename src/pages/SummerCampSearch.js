import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import "./SummerCampSearch.css"



const CampCategories = ['Junior', 'Senior', 'Family'];
const AgeGroups = ['7-13', '14-18', 'Any'];

// Mock Data
const summerCamps = [
    { id: 1, name: 'Camp A', category: 'Junior', ageGroup: '7-13', weekday: 'Monday', price: '200' },
    { id: 2, name: 'Camp B', category: 'Senior', ageGroup: '14-18', weekday: 'Wednesday', price: '250' },
    { id: 3, name: 'Camp C', category: 'Family', ageGroup: '', weekday: 'Friday', price: '300' },
    { id: 4, name: 'Camp D', category: 'Junior', ageGroup: '8-12', weekday: 'Tuesday', price: '220' },
    { id: 5, name: 'Camp E', category: 'Senior', ageGroup: '15-18', weekday: 'Thursday', price: '275' },
    { id: 6, name: 'Camp F', category: 'Family', ageGroup: '', weekday: 'Saturday', price: '350' },
    { id: 7, name: 'Camp G', category: 'Junior', ageGroup: '9-14', weekday: 'Monday', price: '210' },
    { id: 8, name: 'Camp H', category: 'Senior', ageGroup: '16-18', weekday: 'Wednesday', price: '260' },
    { id: 9, name: 'Camp I', category: 'Family', ageGroup: '', weekday: 'Sunday', price: '320' },
    { id: 10, name: 'Camp J', category: 'Junior', ageGroup: '10-13', weekday: 'Friday', price: '230' },
    { id: 11, name: 'Camp K', category: 'Senior', ageGroup: '14-17', weekday: 'Thursday', price: '290' },
    { id: 12, name: 'Camp L', category: 'Family', ageGroup: '', weekday: 'Saturday', price: '340' }
];


function SummerCampSearch() {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
    const [selectedWeekday, setSelectedWeekday] = useState('');
    const [selectedMinPrice, setSelectedMinPrice] = useState('');
    const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Functions to handle the change in the facted search
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleAgeGroupChange = (ageGroup) => {
        setSelectedAgeGroup((prev) => {
            if (ageGroup === 'Any') {
                return '';
            } else {
                return prev === ageGroup ? '' : ageGroup;
            }
        });
    };

    const handleWeekdayChange = (e) => {
        setSelectedWeekday(e.target.value);
    };

    const handleMinPriceChange = (e) => {
        setSelectedMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setSelectedMaxPrice(e.target.value);
    };

    const filteredData = summerCamps.filter((item) => {
        return (
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            (selectedAgeGroup.length === 0 || selectedAgeGroup.includes(item.ageGroup)) &&
            (selectedWeekday === '' || item.weekday === selectedWeekday) &&
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
            <h1>Search for Summer Camp</h1>
            <Form>
                <Row className="mt-4">
                    <Col md={2} className=' facted-search border'>
                        <Form.Label className="title">Camp Category</Form.Label>
                        {CampCategories.map((category, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={category}
                                className="faceted"
                                onChange={() => handleCategoryChange(category)}
                                checked={selectedCategories.includes(category)}
                            />
                        ))}
                        <Form.Label className="title mt-4">Age Group</Form.Label>
                        {AgeGroups.map((ageGroup, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={ageGroup}
                                className="faceted"
                                onChange={() => handleAgeGroupChange(ageGroup)}
                                checked={selectedAgeGroup.includes(ageGroup)}
                            />
                        ))}
                        <Form.Label className="title mt-4">Weekday</Form.Label>
                        <Form.Control as="select" value={selectedWeekday} onChange={handleWeekdayChange}>
                            <option value="">Any</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            {/* Add more days as needed */}
                        </Form.Control>
                        <Form.Label className="title mt-4">Min Price</Form.Label>
                        <Form.Control type="number" value={selectedMinPrice} onChange={handleMinPriceChange} />
                        <Form.Label className="title mt-4">Max Price</Form.Label>
                        <Form.Control type="number" value={selectedMaxPrice} onChange={handleMaxPriceChange} />
                    </Col>
                    <Col md={10}>
                        <Row className="mt-4 summer-camps">
                            {filteredData.map((item) => (
                                <Col key={item.id} md={6} lg={4} className="mb-4">
                                    <div className="border">
                                        <h5 className="mt-2">{item.name}</h5>
                                        <Container className="search-result-item">
                                            <p>Category: {item.category}</p>
                                            <p>Age Group: {item.ageGroup}</p>
                                            <p>Weekday: {item.weekday}</p>
                                            <p>Price: ${item.price}</p>
                                        </Container>
                                        <Button className="book-btn mb-3" onClick={openBookingModal}>
                                            Book a Spot
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
                    <Modal.Title>Book Summer Camp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default SummerCampSearch;
