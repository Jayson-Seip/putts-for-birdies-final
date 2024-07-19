import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Modal } from "react-bootstrap";
import "./Lessons.css"
import BookingLessonPage from "./BookLesson.js";
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';

export const lessonPackages = [
    {
        id: 1,
        title: 'Beginner Package',
        description: 'Perfect for those new to golf, this package includes introduction to basic golf techniques and etiquette.',
        features: [
            '5 one-hour Lessons with a professional instructor',
            'a 1.5 Hour Lesson on our 9-Hole Golf Course',
            'Learn the Basics of Driving, Chipping, and putting',
            'Complimentary use of golf clubs and balls'

        ],
        price: '$500'
    },
    {
        id: 2,
        title: 'Intermediate Package',
        description: 'Prefect for Golfers with previous golf experence and are looking to improve there golf game.',
        features: [
            '5 one-hour lessons with a professional instructor',
            'a 1.5 Hour Lesson on our 9-Hole Golf Course',
            'Personalized improvment: Drving, Shortgame, Putting',
            'Learn stratigies on how to naviagte a golf course'

        ],
        price: '$800'
    },
    {
        id: 3,
        title: 'Advance Package',
        description: 'Designed for experienced golfers seeking to refine their skills and excel in competitive play.',
        features: [
            '5 one-hour lessons with a professional instructor',
            '1 Lesson on either our 9 or 18-Hole Golf Course',
            'Fine-tuning of swing mechanics and shot shaping',
            'Prepare for competitive play and tournaments'
        ],
        price: '$1100'
    },
    {
        id: 4,
        title: 'Single Lessons',
        description: 'A singular private one-on-one lesson with one of our instructors.',
        features: [
            'Personalized instruction tailored to your skill level.',
            'Focused attention on specific areas of improvement.',
            'Flexibility in scheduling based on your availability.'
        ],
        price: '$60/Hour'
    },
    {
        id: 5,
        title: 'Group Lessons',
        description: 'Learn golf in a group setting with friends or other participants.',
        features: [
            'Structured lessons with a certified instructor.',
            'Access to our Driving Range and Putting Green',
            'Opportunities for friendly competition and skill development.',
            'Social interaction and camaraderie with fellow golf enthusiasts.'
        ],
        price: '$70/Hour'
    },
    {
        id: 6,
        title: 'Family Lessons',
        description: 'Enjoy golf lessons together with your family members.',
        features: [
            'Group instruction suitable for all skill levels and ages.',
            'Customized lessons that cater to the needs of each family member.',
            'Fun and interactive sessions that promote learning and bonding.'
        ],
        price: '$200/Hour'
    }


];

const videoTutorials = [

    {
        videoLink: "https://youtu.be/Txjm1TjageQ?si=VF8p1fd7O8nCz2-x",
        title: "Swinging a Golf Club",
        description: "learn Putting"
    },
    {
        videoLink: "https://youtu.be/cia6EeHF7ZQ?si=uFoLhORnXNuHYIgB",
        title: "Teeing Off"
    },
    {
        videoLink: "https://youtu.be/hoVIDS6UmFk?si=Quq7zVGM_GlF3Fmj",
        title: "Using an Iron",
        description: "learn Putting"
    },
    {
        videoLink: "https://youtu.be/4DT-DAOfAHk?si=L2rPLxtvamm2_nZ2",
        title: "Hitting from Rough"
    },
    {
        videoLink: "https://youtu.be/dwubg2qgV0A?si=hBlZQ7i5zEdPU7Nv",
        title: "Chipping Tutorial",
        description: "learn Putting"
    },
    {
        videoLink: "https://youtu.be/AuyVMXl5iYQ?si=9SXmgkQaYZ9O0cH_",
        title: "Putting Tutorial",
        description: "learn Putting"
    }


];

const convertToEmbedURL = (url) => {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
};






function Lesson() {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const openBookingModal = (lesson) => {

        if (localStorage.getItem('userUID') != null) {
            setSelectedLesson(lesson);
            setShowBookingModal(true);
        } else {
            setShowSignupModal(true);
            setIsSignedIn(false);
        }
    };


    const closeBookingModal = () => {
        setShowBookingModal(false);
    };

    const closeSignupModal = () => {
        setShowSignupModal(false);
    };

    const navigate = useNavigate();

    return (
        <Container className="lessons-page">
            <Container className="mt-4">
                <Row className="tournament-heading align-items-center" role="banner">
                    <Col xs="auto">
                        <Button className='back-button' onClick={() => navigate('/')} aria-label="Back to Home Page">
                            ← Back to Home Page
                        </Button>
                    </Col>
                    <Col>
                        <h1>Lessons</h1>
                    </Col>
                    <Col sm={2}></Col>

                </Row>
                <h4> Choose from our variaty of packages and for different Skill Levels</h4>
                <Row>
                    {lessonPackages.map((pkg, index) => (
                        <Col key={index} md={6} lg={4} className="mb-4">
                            <Card className="mt-5">
                                <Card.Body>
                                    <Card.Title>{pkg.title}</Card.Title>
                                    <Card.Text className="lesson-cards">{pkg.description}</Card.Text>
                                    <h6 className="features">Features: </h6>
                                    <ul className="feature-list">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                    <Card.Text className="price">Price: {pkg.price}</Card.Text>
                                    <Button className="book" onClick={() => openBookingModal(pkg)}>Book Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Modal show={showBookingModal} onHide={closeBookingModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book a Lesson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BookingLessonPage lesson={selectedLesson} />
                    </Modal.Body>
                </Modal>
            </Container>
            <Container className="mt-5">
                <h1 className="green-heading"> Video Tutorials </h1>
                <h4> Check out our below video tutorials to get a grasp on the basic elements of golf before booking lessons</h4>
            </Container>
            <Row>
                {videoTutorials.map((pkg, index) => (
                    <Col key={index} md={6} lg={4} className="mb-4">
                        <Card className="mt-5">
                            <Card.Body>
                                <Card.Title>{pkg.title}</Card.Title>
                                <iframe className="tutorial-video"
                                    width="100%"
                                    height="200"
                                    src={convertToEmbedURL(pkg.videoLink)}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>

                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>
            <SignIn show={showSignupModal} handleClose={closeSignupModal} isSignedIn={isSignedIn} />
        </Container>
    );

}

export default Lesson;