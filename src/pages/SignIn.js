import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

function SignIn({ show, handleClose }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleSignIn = () => {
        // Handle sign-in logic (e.g., API call, authentication)
        setIsSignedIn(true);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isSignedIn ? 'Welcome User!' : 'Sign In'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isSignedIn ? (
                    <p>You are signed in!</p>
                ) : (
                    <Form onSubmit={handleSignIn}>
                        <Row className="mb-3">
                            <Col sm={6}>
                                <Form.Control type="text" placeholder="Username" className="username" />
                            </Col>
                            <Col sm={6}>
                                <Form.Control type="password" placeholder="Password" className="password" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={12} className="text-center">
                                <Button variant="primary" type="submit" className="btn-sign-in">
                                    Sign In
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
    );

};
export default SignIn;