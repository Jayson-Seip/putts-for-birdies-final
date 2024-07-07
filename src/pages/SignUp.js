import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const Signup = ({ show, handleClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {
        const newUser = { username, email, password };
        // Here you can perform additional validation if needed
        if (username && email && password) {
            // Store user information in local storage
            localStorage.setItem('user', JSON.stringify(newUser));
            console.log('User signed up and stored in local storage:', newUser);

            // Optionally, you can clear the form fields after submission
            setUsername('');
            setEmail('');
            setPassword('');

            // Close the modal after signup
            handleClose();
        } else {
            setError('Please fill out all fields.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formUsername">
                        <Form.Label column sm={3}>
                            Username
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formEmail">
                        <Form.Label column sm={3}>
                            Email
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPassword">
                        <Form.Label column sm={3}>
                            Password
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {error && (
                        <Form.Text className="text-danger">
                            {error}
                        </Form.Text>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSignup}>
                    Sign Up
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Signup;
