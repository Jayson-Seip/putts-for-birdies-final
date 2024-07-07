import React, { useState } from 'react';
import { Form, Button, ProgressBar, Container, Row, Col } from 'react-bootstrap';

function BookingLessonPage({ onSubmit }) {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        tournamentName: '',
        teeTime: '',
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData, [name]: value, equipment: {
                ...formData.equipment,
                [name]: checked,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const calculateProgress = () => {
        const totalSteps = 2; // Adjust this based on total steps
        return Math.round((step / totalSteps) * 100);
    };

    return (
        <Container>
            {!submitted ? ( // Conditionally render form if not submitted
                <Form onSubmit={handleSubmit}>
                    <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
                    {step === 1 && (
                        <div>

                            <Form.Group controlId="Info">
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
                                    <Col sm={6}><Form.Label> Last Name </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        /></Col>
                                </Row>
                                <Row>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Row>
                                <Row>
                                    <Form.Label>phoneNumber</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </Row>



                            </Form.Group>
                            {/* Add other form fields for step 1 */}
                            <Button variant="primary mt-2" onClick={handleNext}>
                                Next
                            </Button>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <Form.Group controlId="tournament-info">
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
                            {/* Add other form fields for step 2 */}
                            {formData.requireEquipment === 'yes' && (
                                <Form.Group>
                                    <Form.Label>Equipment Needed:</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        label="Golf Clubs"
                                        name="golfClubs"
                                        checked={formData.equipment.golfClubs}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Tees"
                                        name="tees"
                                        checked={formData.equipment.tees}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Balls"
                                        name="balls"
                                        checked={formData.equipment.balls}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            )}
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    )}
                </Form>
            ) : (
                <div>
                    <h3>Thank you for your submission!</h3>
                    {/* You can add additional content here after submission */}
                </div>
            )}
        </Container>
    );
};

export default BookingLessonPage;
