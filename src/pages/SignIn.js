import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig'; // Import Firebase auth
import SignUp from './SignUp'; // Import the SignupModal component

function SignIn({ show, handleClose }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSignupModal, setShowSignupModal] = useState(false); // State for showing Signup modal

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setIsSignedIn(true);
            setError('');

            // Creates a Session for the user using there userUID to be able to store data
            localStorage.removeItem('userUID');
            localStorage.setItem('userUID', user.uid);

        } catch (error) {
            setEmail('');
            setPassword('');
            setError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            setIsSignedIn(false);
            setEmail('');
            setPassword('');
            setError('');
            localStorage.removeItem('userUID');
        }).catch((error) => {
            console.log('Error signing out:', error);
        });
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
                                        placeholder="Email"
                                        className="username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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