import React, { useState } from 'react';
import { Container, Form, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { lessonPackages } from './Lessons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookLesson.css';

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

function BookingForm({ lesson }) {
    console.log(lesson);
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        pkgLesson: lesson ? lesson.title : '',
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
        date: new Date(),
        time: '07:00',
        isFirstNameValid: false,
        isLastNameValid: false,
        isEmailValid: false,
        isPhoneNumberValid: false,
    });
    const [submittedData, setSubmittedData] = useState(null);
    const [bookingNumber, setBookingNumber] = useState(null);

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
        } else {
            setFormData((prevData) => ({
                ...prevData,
                isFirstNameValid,
                isLastNameValid,
                isEmailValid,
                isPhoneNumberValid,
            }));
        }
    };

    const handleBack = () => setStep(step - 1);

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

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date: date,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        setBookingNumber(Math.floor(Math.random() * 1000000));
        setSubmitted(true);
    };

    const calculateProgress = () => {
        return step === 1 ? 33 : step === 2 ? 66 : 100;
    };

    return (
        <Container>
            {!submitted ? (
                <Form onSubmit={handleSubmit}>
                    <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} variant="success" />
                    {step === 1 && (
                        <div>
                            <Form.Group controlId="tournament-select">
                                <Form.Label>Select a Lesson package</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="pkgLesson"
                                    value={formData.pkgLesson}
                                    onChange={handleChange}
                                    readOnly
                                >
                                    <option value={lesson.title}>{lesson.title}</option>
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
                                <Row>
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
                                </Row>
                                <Row>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!validatePhoneNumber(formData.phoneNumber)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid 10-digit phone number.
                                    </Form.Control.Feedback>
                                </Row>
                            </Form.Group>
                            <Button variant="success mt-2" onClick={handleNext}>
                                Next
                            </Button>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group controlId="date-picker" className='mt-2'>
                                        <Form.Label>Select Date</Form.Label>
                                        <DatePicker
                                            selected={formData.date}
                                            onChange={handleDateChange}
                                            dateFormat="MMMM d, yyyy"
                                            className="form-control"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group controlId="time-picker" className='mt-2'>
                                        <Form.Label>Select Time</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            {Array.from({ length: 22 }, (_, i) => {
                                                const hour = Math.floor(i / 2) + 7;
                                                const minutes = i % 2 === 0 ? '00' : '30';
                                                const time = `${hour < 10 ? `0${hour}` : hour}:${minutes}`;
                                                return <option key={time} value={time}>{time}</option>;
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Button variant="success mt-2" onClick={handleBack}>
                                        Back
                                    </Button>
                                </Col>
                                <Col sm={6} className='button-right'>
                                    <Button variant="success mt-2" onClick={handleNext} className="ml-2">
                                        Next
                                    </Button>
                                </Col>
                            </Row>
                        </div>


                    )}
                    {step === 3 && (
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
                            <Row>
                                <Col sm={6}>
                                    <Button variant="success" onClick={handleBack}>
                                        Back
                                    </Button>
                                </Col>
                                <Col sm={6} className='button-right'>
                                    <Button variant="success" type="submit" className="ml-2">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>


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
                    <p><strong>Date:</strong> {submittedData.date.toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {submittedData.time}</p>
                </div>
            )}
        </Container>
    );
}

export default BookingForm;