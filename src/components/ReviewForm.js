import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReviewForm = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [type, setType] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit({ name, rating, comment }); // Pass form data to parent component
        setIsSubmitted(true); // Update state to indicate submission
    };
    const handleClose = () => {
        handleResetForm()
        setIsSubmitted(false)
        onClose()
    };

    const handleResetForm = () => {
        setName('');
        setRating(0);
        setType('');
        setComment('');
        setIsSubmitted(false);
    };

    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isSubmitted ? 'Thank You for Your Review!' : 'Leave a Review'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isSubmitted ? (
                    <p>Your review has been submitted!</p>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formRating">
                            <Form.Label>Rating:</Form.Label>
                            <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(parseInt(e.target.value))}
                                required
                            >
                                <option value="0">Select rating</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Average</option>
                                <option value="4">4 - Good</option>
                                <option value="5">5 - Excellent</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="typeOfRating">
                            <Form.Label>type of comment:</Form.Label>
                            <Form.Control
                                as="select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="">Select review type</option>
                                <option value="Tournament">Tournament</option>
                                <option value="Golf-Courses">Golf Courses</option>
                                <option value="Summer-Camps">Summer Camps</option>
                                <option value="Chipping/Putting Green">Chipping/Putting Green</option>
                                <option value="Other">Other</option>
                                <option value="2-or-More">2 or More</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formComment">
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Write your review..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary mt-2" type="submit">
                            Submit Review
                        </Button>
                    </Form>
                )}
            </Modal.Body>
            {!isSubmitted && (
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="link" onClick={handleResetForm}>
                        Reset Form
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default ReviewForm;
