import React, { useState, useEffect } from 'react';
import { Form, Button, ProgressBar, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
import { tournaments } from '../components/TournamentData';
import './BookingTournamentPage.css';


const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(String(phoneNumber));
};

const validateName = (name) => {
    return name.trim() !== '';
};

const BookingTournamentPage = ({ tournament }) => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        tournamentName: tournament ? tournament.name : (tournaments.length > 0 ? tournaments[0].name : ''),
        requireEquipment: 'no',
        equipment: {
            golfClubs: false,
            tees: false,
            balls: false,
        },
        startDate: tournament ? tournament.date : '',
        startTime: tournament ? tournament.time : '',
        selectedDay: '',
        isFirstNameValid: false,
        isLastNameValid: false,
        isEmailValid: false,
        isPhoneNumberValid: false,
    });
    const [submittedData, setSubmittedData] = useState(null);
    const [bookingNumber, setBookingNumber] = useState(null);
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    console.log(tournament);

    useEffect(() => {
        if (tournament) {
            const selectedDate = new Date(tournament.date);
            selectedDate.setUTCHours(12); // Ensure date is set to noon UTC to avoid timezone issues
            const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
            setFormData(prevData => ({
                ...prevData,
                tournamentName: tournament.name,
                startDate: tournament.date,
                startTime: tournament.time,
                selectedDay
            }));
        }
    }, [tournament]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                equipment: {
                    ...prevData.equipment,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

            if (name === 'startDate') {
                const selectedDate = new Date(value);
                selectedDate.setUTCHours(12); // Ensure date is set to noon UTC to avoid timezone issues
                const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
                setFormData(prevData => ({ ...prevData, selectedDay }));
            }
        }
    };
    useEffect(() => {
        if (error) {
            console.log('Error state updated:', error);
            setShowErrorModal(true); // Show the error modal when an error occurs
        }
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {

            throw new Error('Simulated error');
            const bookingData = {
                id: new Date().getTime(), // Unique ID for the booking
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                tournamentName: formData.tournamentName,
                requireEquipment: formData.requireEquipment,
                equipment: { ...formData.equipment },
                startDate: formData.startDate,
                startTime: formData.startTime,
                selectedDay: formData.selectedDay,
            };

            // Simulate a successful submission
            setSubmittedData(bookingData);
            setBookingNumber(bookingData.id);
            setSubmitted(true);
        } catch (err) {
            setError('Sorry, An error occurred while submitting your booking. Please try re-sumbtting your data.<br/><br/> if this persits please contact support@puttsForBirdies.com');
            setShowErrorModal(true);
        }
    };

    const handleNext = () => {
        const isFirstNameValid = validateName(formData.firstName);
        const isLastNameValid = validateName(formData.lastName);
        const isEmailValid = validateEmail(formData.email);
        const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);

        if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid) {
            setFormData((prevData) => ({
                ...prevData,
                isFirstNameValid,
                isLastNameValid,
                isEmailValid,
                isPhoneNumberValid,
            }));
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const calculateProgress = () => {
        const totalSteps = 2; // Adjust this based on total steps
        return Math.round((step / totalSteps) * 100);
    };

    return (
        <Container>
            {!submitted ? (
                <Form onSubmit={handleSubmit}>
                    <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} variant="success" />
                    {step === 1 && (
                        <div>
                            <Form.Group controlId="tournament-select">
                                <Form.Label>Select a Tournament</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tournamentName"
                                    value={formData.tournamentName}
                                    onChange={handleChange}
                                    readOnly
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="personal-info" className="mt-4">
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateName(formData.firstName)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your first name.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateName(formData.lastName)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your last name.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col sm={6}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateEmail(formData.email)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email address.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validatePhoneNumber(formData.phoneNumber) || /\D/.test(formData.phoneNumber)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid 10-digit phone number with numbers only.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col sm={6}>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            readOnly
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            readOnly
                                        >
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col sm={12}>
                                        <Form.Label>Selected Day</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="selectedDay"
                                            value={formData.selectedDay}
                                            readOnly
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button className="book mt-2" onClick={handleNext}>
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
                            <Row>
                                <Col sm={6}>
                                    <Button className='book mt-2' onClick={handleBack}>
                                        Back
                                    </Button>
                                </Col>
                                <Col sm={6} className="text-right">
                                    <Button className='book mt-2' type="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Form>
            ) : (
                <div>
                    <h3>Thank you for your submission!</h3>
                    <p>Your booking number is: {bookingNumber}</p>
                    <h4>Submitted Information:</h4>
                    <p><strong>First Name:</strong> {submittedData.firstName}</p>
                    <p><strong>Last Name:</strong> {submittedData.lastName}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
                    <p><strong>Tournament Name:</strong> {submittedData.tournamentName}</p>
                    <p><strong>Start Date:</strong> {submittedData.startDate}</p>
                    <p><strong>Start Time:</strong> {submittedData.startTime}</p>
                    <p><strong>Selected Day:</strong> {submittedData.selectedDay}</p>
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
            {/* Error Modal */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>

                        <i className="bi bi-exclamation-triangle-fill" style={{ color: 'red' }}></i> Error
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body><div dangerouslySetInnerHTML={{ __html: error }} /></Modal.Body>

                <Modal.Footer>
                    <Button className='book' variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BookingTournamentPage;