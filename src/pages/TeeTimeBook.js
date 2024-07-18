import React, { useState } from 'react';
import { Form, Button, ProgressBar, Container, Row, Col, Modal } from 'react-bootstrap';
import { db } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


function TeeTimeBook({ teeTime }) {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const UID = localStorage.getItem('userUID');
    const selectedDate = new Date(teeTime.date);
    selectedDate.setUTCHours(12); // Ensure date is set to noon UTC to avoid timezone issues
    const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        teeTimePackage: teeTime ? teeTime.name : (teeTime.length > 0 ? teeTime[0].title : ''),
        startDate: teeTime.date,
        startTime: teeTime.time,
        dayOfWeek: selectedDay,
        numberOfPlayers: 1,
        requireEquipment: 'no',
        requireGolfCart: 'no',
        equipment: {}
    });
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState('');
    console.log(formData.teeTimePackage);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookingData = {
                id: new Date().getTime(),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                teeTimePackage: formData.teeTimePackage,
                startDate: formData.startDate,
                startTime: formData.startTime,
                selectedDay: formData.dayOfWeek,
                numberOfPlayers: formData.numberOfPlayers,
                requireEquipment: formData.requireEquipment,
                requireGolfCart: formData.requireGolfCart,
                equipment: formData.equipment,
                userUID: UID
            }
            await addDoc(collection(db, 'bookings'), bookingData);
            setSubmitted(true);
        }
        catch (err) {
            console.log(err);
            setError('Sorry, An error occurred while submitting your booking. Please try re-sumbtting your data.<br/><br/> if this persits please contact support@puttsForBirdies.com');
            setShowErrorModal(true);
        }


    };
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
    const validateNumberOfPlayers = (numberOfPlayers) => {
        return numberOfPlayers >= 1 && numberOfPlayers <= 4;
    };

    const handleNext = () => {
        const isFirstNameValid = validateName(formData.firstName);
        const isLastNameValid = validateName(formData.lastName);
        const isEmailValid = validateEmail(formData.email);
        const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);
        const isNumberOfPlayersValid = validateNumberOfPlayers(formData.numberOfPlayers);

        if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid && isNumberOfPlayersValid) {
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
        const totalSteps = 2;
        return Math.round((step / totalSteps) * 100);
    };

    return (
        <Container>
            {!submitted ? (
                <Form onSubmit={handleSubmit}>
                    <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} variant="success" />
                    {step === 1 && (
                        <div>
                            <Form.Group controlId="teeTime-select">
                                <Form.Label>Select a Tee Time Package</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="teeTimePackage"
                                    value={formData.teeTimePackage}
                                    onChange={handleChange}
                                    readOnly
                                >
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
                                            isInvalid={!validateName(formData.firstName)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a first name.
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
                                            Please enter a last name.
                                        </Form.Control.Feedback>
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
                                            isInvalid={!validatePhoneNumber(formData.phoneNumber)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid 10-digit phone number with numbers only.
                                        </Form.Control.Feedback>
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
                                            isInvalid={!validateNumberOfPlayers(formData.numberOfPlayers)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid number of players (min. 1 and max. 4).
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button variant="success mt-2" onClick={handleNext}>
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
                            <Button variant="secondary" onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="success" type="submit" className="ml-2">
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
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="bi bi-exclamation-triangle-fill" style={{ color: 'red' }}></i> Error
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: error }} />
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default TeeTimeBook;