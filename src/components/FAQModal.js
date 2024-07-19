import React from 'react';
import { Modal, Accordion } from 'react-bootstrap';
import './FAQModal.css';

function FAQModal({ show, handleClose }) {
    // Displays the FAQ for the user
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Frequently Asked Questions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>How do I search for items?</Accordion.Header>
                        <Accordion.Body>
                            Select the desired filters and view the available options.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>How do I book an item?</Accordion.Header>
                        <Accordion.Body>
                            Click the "Book" button next to the desired item and follow the instructions.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Can I filter by multiple criteria?</Accordion.Header>
                        <Accordion.Body>
                            Yes, you can select multiple criteria to narrow down your search results.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>What if I don't select any filters?</Accordion.Header>
                        <Accordion.Body>
                            If no filters are selected, all available items will be displayed.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>How does the Weekly Calander Work?</Accordion.Header>
                        <Accordion.Body>
                            The calander is a weekly calander that shows tournaments that you are registered in for the week.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="5">
                        <Accordion.Header>What is my Skill Level?</Accordion.Header>
                        <Accordion.Body>
                            Skill Level is very subjective but here are ways to detemine it:
                            <br />
                            <br />
                            <strong>Beginner</strong>: Played less than 10 tournaments.
                            <br />
                            <strong>Intermediate</strong>: Played 10-20 tournaments.
                            <br />
                            <strong>Advanced</strong>: Played 20-30 tournaments.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header>How do I pay for my reservation</Accordion.Header>
                        <Accordion.Body>
                            Payments can be made upon check-in at the tournament.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="7">
                        <Accordion.Header>How do I cancel my reservation?</Accordion.Header>
                        <Accordion.Body>
                            Contact 613-111-2222 <br />
                            <strong>Note: Cancellations must be made 24 hours in advance.</strong>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="8">
                        <Accordion.Header>How do I contact support?</Accordion.Header>
                        <Accordion.Body>
                            You can reach out to our support team at support@puttsForBirdies.com.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
        </Modal>
    );
}

export default FAQModal;