import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
                    <form onSubmit={handleSignIn}>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </form>
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