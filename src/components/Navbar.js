//import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
//import { BrowserRouter as Rotuer, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.css'


function navbar({ handleSignInClick, handleReviewClick }) {

    return (
        <Navbar expand="lg" className="Nav">
            <Container fluid>
                <Navbar.Brand href="/" className="Site-Name">
                    Putts For Birdies
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to="/" className="nav-link">Our Facilities</Link>
                        <Link to="/services" className="nav-link">Our Services</Link>
                        <Link to="/" className="nav-link">Location</Link>
                        <Link to="/WeeklySchedule" className="nav-link">Weekly Calendar</Link>
                        <Nav.Link className="nav-link" onClick={handleSignInClick}>
                            Sign-in
                        </Nav.Link>
                        <Nav.Link className="nav-link" onClick={handleReviewClick}>Leave a Review</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>


        </Navbar>
    );
};

export default navbar