import React, { useState } from 'react';
import { Form, Button, ProgressBar, Container, Row, Col } from 'react-bootstrap';
import { summerCamps } from '../components/SummerCampData';

function BookingSummerCamp({ onSubmit }) {
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
        campPackage: summerCamps.length > 0 ? summerCamps[0].title : '',
        requireEquipment: 'no',
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
                            <Form.Group controlId="camp-select">
                                <Form.Label>Select a Camp Package</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="campPackage"
                                    value={formData.campPackage}
                                    onChange={handleChange}
                                >
                                    {summerCamps.map((camp) => (
                                        <option key={camp.id} value={camp.name}>
                                            {camp.name}
                                        </option>
                                    ))}
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
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Parent Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="parentLastName"
                                            value={formData.parentLastName}
                                            onChange={handleChange}
                                            required
                                        />
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
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Parent Phone Number</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="parentPhoneNumber"
                                            value={formData.parentPhoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
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
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Child Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="childLastName"
                                            value={formData.childLastName}
                                            onChange={handleChange}
                                            required
                                        />
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
                                        label="golfClub"
                                        name="golfClub"
                                        checked={formData.equipment.golfClub || false}
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
                </div>
            )}


        </Container>
    );
}

export default BookingSummerCamp;
