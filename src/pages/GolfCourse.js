import { Button, Container, Image } from "react-bootstrap";
import './GolfCourse.css'
function GolfCourse() {
    return (
        <Container fluid className="  p-0 mt-2">
            <Container className=" golf-course-info mb-5">
                <h1> Our Golf Courses</h1>
                <h5> Select from one of our 3 Golf Courses to Play on</h5>
            </Container>

            <Image src="/images/18-Hole-Course.jpeg" className="Golf-Course"></Image>
            <Container className="golf-course-info mt-2">
                <h2> 18-Hole Golf Course</h2>
                <p>An 18-hole golf course offers a complete and immersive golfing experience, featuring a diverse range of challenges across its expansive layout. From meticulously manicured fairways to strategically placed hazards, each hole presents a unique test of skill and strategy. Players can enjoy the serene landscapes, varying terrain, and carefully designed greens that cater to both seasoned golfers and beginners alike. Whether you're aiming for par or simply soaking in the beauty of the surroundings, our 18-hole course promises an unforgettable journey through the game of golf."</p>
                <Button>Book a Tee-Time</Button>
            </Container>
            <Container fluid className="mt-5 mb-5">
                <Image src="/images/18-Hole-Course.jpeg" className="Golf-Course"></Image>
                <Container className=" golf-course-info mt-2">
                    <h2> 9-Hole Golf Course</h2>
                    <p>An 18-hole golf course offers a complete and immersive golfing experience, featuring a diverse range of challenges across its expansive layout. From meticulously manicured fairways to strategically placed hazards, each hole presents a unique test of skill and strategy. Players can enjoy the serene landscapes, varying terrain, and carefully designed greens that cater to both seasoned golfers and beginners alike. Whether you're aiming for par or simply soaking in the beauty of the surroundings, our 18-hole course promises an unforgettable journey through the game of golf."</p>
                    <Button>Book a Tee-Time</Button>
                </Container>
            </Container>

            <Container fluid className="mt-5 mb-5">
                <Image src="/images/18-Hole-Course.jpeg" className="Golf-Course"></Image>
                <Container className="golf-course-info mt-2">
                    <h2>championship Golf Course</h2>
                    <p>An 18-hole golf course offers a complete and immersive golfing experience, featuring a diverse range of challenges across its expansive layout. From meticulously manicured fairways to strategically placed hazards, each hole presents a unique test of skill and strategy. Players can enjoy the serene landscapes, varying terrain, and carefully designed greens that cater to both seasoned golfers and beginners alike. Whether you're aiming for par or simply soaking in the beauty of the surroundings, our 18-hole course promises an unforgettable journey through the game of golf."</p>
                    <Button>Book a Tee-Time</Button>
                </Container>
            </Container>
        </Container>

    );
};


export default GolfCourse;