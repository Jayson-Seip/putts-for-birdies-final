import { Container, Card, Button, Row, Col, CardImg } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SummerCampPackages = [
    {
        image: process.env.PUBLIC_URL + "/images/junior-golf-camp.jpg",
        title: "Junior Golf Camp",
        description: "Our Junior Golf Camp offers young golfers aged 7-13 a fun and educational environment to learn the fundamentals of golf or improve there game. From swing techniques to putting and course etiquette, participants will develop their skills and sportsmanship while making new friends. "
    },
    {
        image: process.env.PUBLIC_URL + "/images/parent-child-golf-camps-pb-18.jpg",
        title: "Parent-Child Golf Camp",
        description: "Our Parent-Child Golf Camp offers a unique opportunity for parents and children to bond over their shared passion for golf. Tailored for families looking to strengthen relationships while improving their game, this camp blends expert instruction with enjoyable activities for an enriching experience."
    },
    {
        image: process.env.PUBLIC_URL + "/images/Senior-golf-camp-image.jpg",
        title: "Senior Golf Camp",
        description: "Our Senior Summer Camp is crafted for passionate teen golfers aged 14-18 looking to refine their skills and excel in the game. Participants will benefit from advanced instruction that focuses on enhancing techniques and strategies essential for competitive play."
    }

];
function SummerCamp() {

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/Summer-Camp-Search');
    };
    return (
        <Container>
            <Row className="tournament-heading align-items-center" role="banner">
                <Col xs="auto">
                    <Button className='back-button' onClick={() => navigate('/')} aria-label="Back to Home Page">
                        ← Back to Home Page
                    </Button>
                </Col>
                <Col>
                    <h1>Summer Camp</h1>
                </Col>
                <Col sm={2}></Col>

            </Row>
            {/* Summer Camp Information */}
            <h3>Summer Camps run Monday to Friday from 8am to 5pm</h3>
            <h5> Offered for All Skill Levels </h5>
            <Row className="mt-4">
                {SummerCampPackages.map((pkg, index) => (
                    <Col key={index} md={6} lg={4} className="mb-4">
                        <Card className="tournament-card">
                            <Card.Body>
                                <CardImg variant="top" src={pkg.image} className="img"></CardImg>
                                <Card.Title>{pkg.title}</Card.Title>
                                <Card.Text className="tournament-description">{pkg.description}
                                </Card.Text>
                                <Button className="book" onClick={handleButtonClick}>Search for Camp</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SummerCamp;