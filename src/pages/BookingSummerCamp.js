import React, { useState, useEffect } from 'react';
import { Form, Button, ProgressBar, Container, Row, Col, Modal } from 'react-bootstrap';
import { summerCamps } from '../components/SummerCampData';

function BookingSummerCamp({ onSubmit, camp }) {

    // State Changes 
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        parentFirstName: '',
        parentLastName: '',
        parentEmail: '',
        parentPhoneNumber: '',
        childFirstName: '',
        childLastName: '',
        childAge: '',
        campPackage: camp ? camp.name : (summerCamps.length > 0 ? summerCamps[0].name : ''),
        requireEquipment: 'no',
        equipment: {}
    });

    const [bookingNumber, setBookingNumber] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (camp) {
            setFormData(prevState => ({
                ...prevState,
                campPackage: camp.name
            }));
        }
    }, [camp]);

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
                requireEquipment: value,
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
        setError(null);
        try {
            setSubmitted(true);
            const bookingData = {
                ...formData,
                id: generateBookingId(), // Generate a unique booking ID
            };
            setBookingNumber(bookingData.id); // Set the booking number
            if (onSubmit) {
                onSubmit(bookingData);
            }
        }
        catch (error) {
            setError("Sorry, An error occurred while submitting your booking. Please try re-sumbtting your data.<br/><br/> if this persits please contact support@puttsForBirdies.com");
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

    const generateBookingId = () => {

        return new Date().getTime().toString();
    };

    const handleNext = () => {
        if (validateName(formData.parentFirstName) && validateName(formData.parentLastName) && validateEmail(formData.parentEmail) && validatePhoneNumber(formData.parentPhoneNumber) && validateName(formData.childFirstName) && validateName(formData.childLastName)) {
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
                            <Form.Group controlId="camp-select">
                                <Form.Label>Select a Camp Package</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="campPackage"
                                    value={formData.campPackage}
                                    onChange={handleChange}
                                    readOnly
                                >
                                </Form.Control>

                            </Form.Group>
                            <Form.Group controlId="parent-info">
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>Parent First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="parentFirstName"
                                            value={formData.parentFirstName}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateName(formData.parentFirstName)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your first name.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Parent Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="parentLastName"
                                            value={formData.parentLastName}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateName(formData.parentLastName)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your last name.
                                        </Form.Control.Feedback>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>Parent Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="parentEmail"
                                            value={formData.parentEmail}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateEmail(formData.parentEmail)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email.
                                        </Form.Control.Feedback>

                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Parent Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="parentPhoneNumber"
                                            value={formData.parentPhoneNumber}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validatePhoneNumber(formData.parentPhoneNumber)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid phone number.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="child-info">
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>Child First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="childFirstName"
                                            value={formData.childFirstName}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateName(formData.childFirstName)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your child's first name.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Child Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="childLastName"
                                            value={formData.childLastName}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateName(formData.childLastName)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your child's last name.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>Child Age</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="childAge"
                                            value={formData.childAge}
                                            onChange={handleChange}
                                            required
                                            isInvalid={!validateName(formData.childAge)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your child's age.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button variant="primary mt-2" className='book' onClick={handleNext}>
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
                                        label="Golf Club"
                                        name="golfClub"
                                        checked={formData.equipment.golfClub || false}
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
                    <p><strong>Parent Name:</strong> {formData.parentFirstName} {formData.parentLastName}</p>
                    <p><strong>Parent Email:</strong> {formData.parentEmail}</p>
                    <p><strong>Parent Phone:</strong> {formData.parentPhoneNumber}</p>
                    <p><strong>Child Name:</strong> {formData.childFirstName} {formData.childLastName}</p>
                    <p><strong>Child Age:</strong> {formData.childAge}</p>
                    <p><strong>Camp Package:</strong> {formData.campPackage}</p>
                    <p><strong>Require Equipment:</strong> {formData.requireEquipment}</p>
                    {formData.requireEquipment === 'yes' && (
                        <p><strong>Equipment Needed:</strong> Golf Club</p>
                    )}
                </div>
            )}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>

                        <i className="bi bi-exclamation-triangle-fill" style={{ color: 'red' }}></i> Error
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body><div dangerouslySetInnerHTML={{ __html: error }} /></Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default BookingSummerCamp;