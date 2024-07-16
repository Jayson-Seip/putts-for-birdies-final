import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import "./SummerCampSearch.css"
import BookingSummerCamp from './BookingSummerCamp';
import { summerCamps } from "../components/SummerCampData";
const CampCategories = ['Junior', 'Senior', 'Family'];
const AgeGroups = ['7-13', '14-18', 'Any'];
const SkillLevels = ['Beginner', 'Intermediate', 'Advanced'];

function SummerCampSearch() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
    const [selectedWeekday, setSelectedWeekday] = useState('');
    const [selectedMinPrice, setSelectedMinPrice] = useState('');
    const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
    const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
    const [selectedCamp, setSelectedCamp] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Functions to handle the change in the faceted search
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleAgeGroupChange = (ageGroup) => {
        setSelectedAgeGroup((prev) => {
            if (ageGroup === 'Any') {
                return [];
            } else {
                return prev.includes(ageGroup) ? prev.filter((ag) => ag !== ageGroup) : [...prev, ageGroup];
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

    const handleSkillLevelChange = (level) => {
        setSelectedSkillLevel((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    };

    const filteredData = summerCamps.filter((item) => {
        return (
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            (selectedAgeGroup.length === 0 || selectedAgeGroup.includes(item.ageGroup)) &&
            (selectedWeekday === '' || item.weekday === selectedWeekday) &&
            (selectedMinPrice === '' || Number(item.price) >= Number(selectedMinPrice)) &&
            (selectedMaxPrice === '' || Number(item.price) <= Number(selectedMaxPrice)) &&
            (selectedSkillLevel.length === 0 || selectedSkillLevel.includes(item.skillLevel))
        );
    });

    const openBookingModal = (camp) => {
        setSelectedCamp(null);
        setSelectedCamp(camp);
        setShowBookingModal(true);
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
        //setSelectedCamp(null);
    };

    return (
        <Container>
            <Container className="text-header mt-3"><h1>Search for Summer Camp</h1></Container>

            <Form>
                <Row className="mt-4 align-items-start">
                    <Col md={2} className='facted-search border'>
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
                        <Form.Label className="title mt-4">Skill Level</Form.Label>
                        {SkillLevels.map((level, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={level}
                                className="faceted"
                                onChange={() => handleSkillLevelChange(level)}
                                checked={selectedSkillLevel.includes(level)}
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
                                            <p>Skill Level: {item.skillLevel}</p>
                                        </Container>
                                        <Button className="book mb-3" onClick={() => openBookingModal(item)}>
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
                    <Modal.Title>Book a Summer Camp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BookingSummerCamp onClose={closeBookingModal} camp={selectedCamp}></BookingSummerCamp>

                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default SummerCampSearch;