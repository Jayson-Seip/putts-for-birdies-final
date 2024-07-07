import { Container, Card, Button, Row, Col, CardImg } from "react-bootstrap";
import './Tournaments.css';
import { useNavigate } from "react-router-dom";

const tournamentTypes = [
    {
        image: "/images/Charity-image.jpg",
        title: "Charity Tournament",
        description: "These tournaments are organized to raise funds for charitable causes and are hosted by the club. All proceeds generated from these events go towards various charitable initiatives and community projects.",
    },
    {
        title: "Juniors Tournaments",
        description: "Junior tournaments provide young golfers, typically under 18, with competitive and developmental opportunities. These events are crucial for nurturing future talent and promoting the sport among youth. "
    },
    {
        image: "/images/SeniorGolf.jpg",
        title: "Senior Tournament",
        description: "Senior tournaments cater to golfers typically over 50, showcasing their experience and skill. These events celebrate the longevity and passion of seasoned players in the golfing community."
    },
    {
        title: "Stroke Play Tournaments",
        description: "Stroke play tournaments challenge golfers to complete the course in the fewest total strokes. This torunament is the most common and well known form of golf typically played among indviduals"
    },
    {
        image: "/images/Scramble.jpg",
        title: "Scramble Tournament",
        description: "Scramble tournaments have teams of two or four players each hitting a shot, then selecting the best shot and all playing their next shot from that spot. This team format emphasizes fun, coperation and is a perfect way to meet new people"
    },
    {
        image: "/images/60efbcff1e19a49cf503f165_Rocking The Cradle at Pinehurst Resort.jpg",
        title: "Night Golf Tournaments",
        description: " Night golf tournaments bring a fun twist to the game, played at night using glow-in-the-dark balls and illuminated course markers. This novelty format offers a unique and enjoyable challenge"
    }
];

function Tournament() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/Tournament-Search');
    };
    return (

        <Container>
            <Container className="text-header">
                <h1>Tournament</h1>
            </Container>
            <h4> Putts For Birides is Proud to offer several types of Tournaments</h4>
            <Row className="mt-4">
                {tournamentTypes.map((pkg, index) => (
                    <Col key={index} md={6} lg={4} className="mb-4">
                        <Card className="tournament-card">
                            <Card.Body>
                                <CardImg variant="top" src={pkg.image} className="img"></CardImg>
                                <Card.Title>{pkg.title}</Card.Title>
                                <Card.Text className="tournament-description">{pkg.description}</Card.Text>
                                <Button onClick={handleButtonClick} variant="primary">Search for Tournaments</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}

            </Row>
        </Container>
    );
}

export default Tournament;