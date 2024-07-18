import React from 'react';
import { Modal, Accordion } from 'react-bootstrap';
import './FAQModal.css'; // Import the custom CSS file

function FAQModal({ show, handleClose }) {
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
                            The calander is a weekly calander that shows tournaments being hosted for a given week.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="5">
                        <Accordion.Header>How do I contact support?</Accordion.Header>
                        <Accordion.Body>
                            You can reach out to our support team at support@example.com.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
        </Modal>
    );
}

export default FAQModal;