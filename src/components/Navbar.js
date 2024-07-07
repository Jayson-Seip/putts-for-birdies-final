import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css'


function navbar({ handleSignInClick, handleReviewClick }) {

    return (
        <Navbar expand="lg" className="Nav">
            <Container fluid>
                <Link to="/" className="Site-Name">
                    Putts For Birdies
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title="Our Facilities" id="facilities-dropdown">
                            <NavDropdown.Item as={Link} to="/Golf-Courses">
                                Golf Courses
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Driving-Range">
                                Driving Range
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Putting-Green">
                                Putting/Chipping Green
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Our Services" id="services-dropdown">
                            <NavDropdown.Item as={Link} to="/tournaments">
                                Tournaments
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/lessons">
                                Lessons
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/SummerCamp">
                                Summer Camp
                            </NavDropdown.Item>
                        </NavDropdown>
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