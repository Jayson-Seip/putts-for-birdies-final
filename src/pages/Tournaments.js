import { Container, Card, Button, Row, Col, CardImg } from "react-bootstrap";
import './Tournaments.css';
import { useNavigate } from "react-router-dom";

const tournamentTypes = [
    {
        image: process.env.PUBLIC_URL + "/images/Charity-image.jpg",
        title: "Charity Tournament",
        description: "These tournaments are organized to raise funds for charitable causes and are hosted by the club. All proceeds generated from these events go towards various charitable initiatives and community projects.",
        alt: "Group of Golfers Holding a Banner of a Charity"
    },
    {
        image: process.env.PUBLIC_URL + "/images/Junior-tournament.jpg",
        title: "Juniors Tournaments",
        description: "Junior tournaments provide young golfers, typically under 18, with competitive and developmental opportunities. These events are crucial for nurturing future talent and promoting the sport among youth. ",
        alt: "Group of Young Golfers Teeing Off"
    },
    {
        image: process.env.PUBLIC_URL + "/images/SeniorGolf.jpg",
        title: "Senior Tournament",
        description: "Senior tournaments cater to golfers typically over 50, showcasing their experience and skill. These events celebrate the longevity and passion of seasoned players in the golfing community.",
        alt: "Two Senior Golfers holding Throphies"
    },
    {
        image: process.env.PUBLIC_URL + "/images/Tournament.jpg",
        title: "Stroke Play Tournaments",
        description: "Stroke play tournaments challenge golfers to complete the course in the fewest total strokes. This torunament is the most common and well known form of golf typically played among indviduals",
        alt: "Golfers walking on a golf course with a crowd of spectators in the background."
    },
    {
        image: process.env.PUBLIC_URL + "/images/Scramble.jpg",
        title: "Scramble Tournament",
        description: "Scramble tournaments have teams of two or four players each hitting a shot, then selecting the best shot and all playing their next shot from that spot. This team format emphasizes fun, coperation and is a perfect way to meet new people",
        alt: "Group of golfers on a golf course, one golfer is swinging a club while the others watch."
    },
    {
        image: process.env.PUBLIC_URL + "/images/60efbcff1e19a49cf503f165_Rocking The Cradle at Pinehurst Resort.jpg",
        title: "Night Golf Tournaments",
        description: " Night golf tournaments bring a fun twist to the game, played at night using glow-in-the-dark balls and illuminated course markers. This novelty format offers a unique and enjoyable challenge",
        alt: "Golf course at night with glowing markers and illuminated greens."
    }
];

function Tournament() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/Tournament-Search');
    };
    return (

        <Container>
            <header className="text-header">
                <Row className="tournament-heading align-items-center" role="banner">
                    <Col xs="auto">
                        <Button className='back-button' onClick={() => navigate('/')} aria-label="Back to Home Page">
                            ← Back to Home Page
                        </Button>
                    </Col>
                    <Col>
                        <h1 id="tournament-title">Tournament</h1>
                    </Col>
                    <Col sm={2}></Col>
                </Row>
            </header>
            <main>
                <h4> Putts For Birides is Proud to offer several types of Tournaments</h4>
                <Row className="mt-4" role="main">
                    {tournamentTypes.map((pkg, index) => (
                        <Col key={index} md={6} lg={4} className="mb-4">
                            <Card className="tournament-card" role="region" aria-labelledby={`tournament-title-${index}`} aria-describedby={`tournament-description-${index}`}>
                                <Card.Body>
                                    <CardImg variant="top" src={pkg.image} className="img" alt={pkg.alt}></CardImg>
                                    <Card.Title id={`tournament-title-${index}`} className="mt-2">{pkg.title}</Card.Title>
                                    <Card.Text id={`tournament-description-${index}`} className="tournament-description">{pkg.description}</Card.Text>
                                    <Button className="book" onClick={handleButtonClick} aria-label={`Search for ${pkg.title} Tournaments`}>Search for Tournaments</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </main>
        </Container >
    );
}

export default Tournament;