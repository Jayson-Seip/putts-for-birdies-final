import React, { useState } from 'react';
import { Container, Form, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { lessonPackages } from './Lessons';
function BookingForm() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        pkgLesson: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        requireEquipment: '',
        equipment: {
            golfClubs: false,
            tees: false,
            balls: false,
        },
    });
    const [submittedData, setSubmittedData] = useState(null);
    const [bookingNumber, setBookingNumber] = useState(null);

    const handleNext = () => setStep(step + 1);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                equipment: {
                    ...formData.equipment,
                    [name]: checked,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        setBookingNumber(Math.floor(Math.random() * 1000000));
        setSubmitted(true);
    };

    const calculateProgress = () => {
        return step === 1 ? 50 : 100;
    };

    return (
        <Container>
            {!submitted ? (
                <Form onSubmit={handleSubmit}>
                    <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
                    {step === 1 && (
                        <div>
                            <Form.Group controlId="tournament-select">
                                <Form.Label>Select a Lesson package</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="pkgLesson"
                                    value={formData.pkgLesson}
                                    onChange={handleChange}
                                >
                                    {lessonPackages.map((lesson) => (
                                        <option key={lesson.id} value={lesson.title}>
                                            {lesson.title}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
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
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </Row>
                            </Form.Group>
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
                    <h3>Your Lesson Has Been Booked!</h3>
                    <p>Your booking number is: {bookingNumber}</p>
                    <h4>Submitted Information:</h4>
                    <p><strong>Lesson Package:</strong> {submittedData.pkgLesson}</p>
                    <p><strong>First Name:</strong> {submittedData.firstName}</p>
                    <p><strong>Last Name:</strong> {submittedData.lastName}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
                    <p><strong>Require Equipment:</strong> {submittedData.requireEquipment}</p>
                    {submittedData.requireEquipment === 'yes' && (
                        <div>
                            <p><strong>Equipment Needed:</strong></p>
                            <ul>
                                {submittedData.equipment.golfClubs && <li>Golf Clubs</li>}
                                {submittedData.equipment.tees && <li>Tees</li>}
                                {submittedData.equipment.balls && <li>Balls</li>}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
}

export default BookingForm;
