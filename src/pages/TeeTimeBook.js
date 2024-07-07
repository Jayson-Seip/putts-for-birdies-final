import React, { useState } from 'react';
import { Form, Button, ProgressBar, Container, Row, Col } from 'react-bootstrap';
import { golfCourses } from '../components/GolfTeeTimeData';

function TeeTimeBook({ onSubmit }) {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        teeTimePackage: golfCourses.length > 0 ? golfCourses[0].title : '',
        numberOfPlayers: 1,
        requireEquipment: 'no',
        requireGolfCart: 'no',
        equipment: {}
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData(prevState => ({
                ...prevState,
                equipment: {
                    ...prevState.equipment,
                    [name]: checked,
                },
            }));
        } else if (type === "radio") {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const calculateProgress = () => {
        const totalSteps = 2;
        return Math.round((step / totalSteps) * 100);
    };

    return (
        <Container>
            {!submitted ? (
                <Form onSubmit={handleSubmit}>
                    <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
                    {step === 1 && (
                        <div>
                            <Form.Group controlId="teeTime-select">
                                <Form.Label>Select a Tee Time Package</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="teeTimePackage"
                                    value={formData.teeTimePackage}
                                    onChange={handleChange}
                                >
                                    <option> 9-Hole Golf Course</option>
                                    <option> 18-Hole Golf Course</option>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="personal-info">
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>Number of Players</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="numberOfPlayers"
                                            value={formData.numberOfPlayers}
                                            onChange={handleChange}
                                            required
                                            min={1}
                                            max={4}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button variant="primary mt-2" onClick={handleNext}>
                                Next
                            </Button>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <Form.Group controlId="equipment-info">
                                <Form.Label>Do You Require Equipment</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="requireEquipment"
                                    value="yes"
                                    onChange={handleChange}
                                    checked={formData.requireEquipment === 'yes'}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="requireEquipment"
                                    value="no"
                                    onChange={handleChange}
                                    checked={formData.requireEquipment === 'no'}
                                />
                            </Form.Group>
                            {formData.requireEquipment === 'yes' && (
                                <Form.Group>
                                    <Form.Label>Equipment Needed:</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        label="Golf Clubs"
                                        name="golfClubs"
                                        checked={formData.equipment.golfClubs || false}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Golf Balls"
                                        name="golfBalls"
                                        checked={formData.equipment.golfBalls || false}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            )}
                            <Form.Group controlId="golf-cart-info">
                                <Form.Label>Do You Want a Golf Cart?</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="requireGolfCart"
                                    value="yes"
                                    onChange={handleChange}
                                    checked={formData.requireGolfCart === 'yes'}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="requireGolfCart"
                                    value="no"
                                    onChange={handleChange}
                                    checked={formData.requireGolfCart === 'no'}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    )}
                </Form>
            ) : (
                <div>
                    <h3>Thank you for your submission!</h3>
                </div>
            )}
        </Container>
    );
}

export default TeeTimeBook