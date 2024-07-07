import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import SignUp from './SignUp'; // Import the SignupModal component

function SignIn({ show, handleClose }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSignupModal, setShowSignupModal] = useState(false); // State for showing Signup modal

    const handleSignIn = (e) => {
        e.preventDefault();
        const storedUserData = localStorage.getItem('user');
        const userData = JSON.parse(storedUserData);

        // Access individual properties
        const storedUsername = userData.username;
        const storedEmail = userData.email;
        const storedPassword = userData.password;
        console.log(`Username: ${storedUsername}, Email: ${storedEmail}, Password: ${storedPassword}`);

        // Trim whitespace and convert to strings
        const enteredUsername = username.trim();
        const enteredPassword = password.trim();

        console.log('Entered Username:', enteredUsername);
        console.log('Stored Username:', storedUsername);

        // Check if entered credentials match stored credentials
        if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
            setIsSignedIn(true);
            setError('');
            console.log('Successfully signed in!');
        } else {
            setUsername('');
            setPassword('');
            setError('Invalid username or password');
            console.log('Invalid username or password');
        }
    };


    const handleLogout = () => {
        // Clear signed-in status and any user data from local storage
        setIsSignedIn(false);
        setUsername('');
        setPassword('');
    };

    const openSignupModal = () => {
        setShowSignupModal(true);
    };

    const closeSignupModal = () => {
        setShowSignupModal(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isSignedIn ? 'Welcome User!' : 'Sign In'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isSignedIn ? (
                        <div>
                            <p>You are signed in!</p>
                            <Button variant="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Form onSubmit={handleSignIn}>
                            <Row className="mb-3">
                                <Col sm={12}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        className="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm={12}>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        className="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                            {error && (
                                <Row className="mb-3">
                                    <Col sm={12} className="text-center text-danger">
                                        {error}
                                    </Col>
                                </Row>
                            )}
                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Button variant="primary" type="submit" className="btn-sign-in">
                                        Sign In
                                    </Button>
                                </Col>
                                <Col sm={6} className="text-end">
                                    <Button variant="secondary" onClick={openSignupModal}>
                                        Sign Up
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Modal.Body>
                {isSignedIn && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>

            {/* Signup Modal */}
            <SignUp show={showSignupModal} handleClose={closeSignupModal} />
        </>
    );
}

export default SignIn;
