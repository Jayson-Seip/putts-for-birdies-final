import React, { useState } from 'react';
import { Form, Button, ProgressBar, Container, Row, Col } from 'react-bootstrap';
import { tournaments } from '../components/TournamentData'; // Import the tournament data

function generateHalfHourOptions() {
    let options = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            options.push(
                <option key={time} value={time}>
                    {time}
                </option>
            );
        }
    }
    return options;
}

const BookingTournamentPage = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        tournamentName: tournaments.length > 0 ? tournaments[0].name : '',
        requireEquipment: 'no',
        equipment: {
            golfClubs: false,
            tees: false,
            balls: false,
        },
        startDate: '', // Updated field for date input
        startTime: '', // Updated field for start time input
        selectedDay: '', // New field to store the selected day of the week
    });
    const [submittedData, setSubmittedData] = useState(null);
    const [bookingNumber, setBookingNumber] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
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

        const userBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
        const updatedBookings = {
            ...userBookings,
            [bookingData.id]: bookingData,
        };
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

        setSubmittedData(bookingData);
        setBookingNumber(bookingData.id);
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
            {!submitted ? (
                <Form onSubmit={handleSubmit}>
                    <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
                    {step === 1 && (
                        <div>
                            <Form.Group controlId="tournament-select">
                                <Form.Label>Select a Tournament</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="tournamentName"
                                    value={formData.tournamentName}
                                    onChange={handleChange}
                                >
                                    {tournaments.map((tournament) => (
                                        <option key={tournament.id} value={tournament.name}>
                                            {tournament.name}
                                        </option>
                                    ))}
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
                                <Row className="mt-2">
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
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
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
                                            required
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Time</option>
                                            {generateHalfHourOptions()}
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
        </Container>
    );
};

export default BookingTournamentPage;
