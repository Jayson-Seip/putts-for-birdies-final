import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './GolfCourse.css'
function GolfCourse() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/Tee-Time-Search');
    };
    return (
        <Container fluid className=" golf-course-web  p-0 mt-2">
            <Container className=" text-header golf-course-info mb-5">
                <h1> Our Golf Courses</h1>
                <h5> Select from one of our 3 Golf Courses to Play on</h5>
            </Container>

            <Image src={process.env.PUBLIC_URL + "/images/18-Hole-Course.jpg"} className="Golf-Course"></Image>
            <Container className="golf-course-info mt-2">
                <h2> 18-Hole Golf Course</h2>
                <p>An 18-hole golf course offers a complete and immersive golfing experience, featuring a diverse range of challenges across its expansive layout. From meticulously manicured fairways to strategically placed hazards, each hole presents a unique test of skill and strategy. Players can enjoy the serene landscapes, varying terrain, and carefully designed greens that cater to both seasoned golfers and beginners alike. Whether you're aiming for par or simply soaking in the beauty of the surroundings, our 18-hole course promises an unforgettable journey through the game of golf."</p>
                <Button className="book" onClick={handleButtonClick}>Book a Tee-Time</Button>
            </Container>
            <Container fluid className="mt-5 mb-5">
                <Image src={process.env.PUBLIC_URL + "/images/9-hole-course.jpg"} className="Golf-Course"></Image>
                <Container className=" golf-course-info mt-2">
                    <h2> 9-Hole Golf Course</h2>
                    <p>Our 9-hole golf course offers a compact yet engaging golfing experience, ideal for players looking for a quick and enjoyable round. This course features a thoughtfully designed layout that includes a mix of challenging holes, strategically placed bunkers, and water hazards that test players' accuracy and strategy. With beautifully maintained fairways and greens, golfers of all skill levels can appreciate the charm and accessibility of our 9-hole course. Whether you're practicing your swing, honing your skills, or enjoying a leisurely game with friends, our 9-hole course provides a delightful golfing adventure in a shorter time frame."</p>
                    <Button className="book" onClick={handleButtonClick}>Book a Tee-Time</Button>
                </Container>
            </Container>

            <Container fluid className="mt-5 mb-5">
                <Image src={process.env.PUBLIC_URL + "/images/Champion-coruse.jpg"} className="Golf-Course"></Image>
                <Container className="golf-course-info mt-2">
                    <h2>Championship Golf Course</h2>
                    <p>Our championship golf course is a premier destination for serious golfers, offering a challenging and prestigious layout that meets the highest standards of the game. Spanning an impressive expanse, this 18-hole course features meticulously groomed fairways, undulating greens, and a variety of strategically placed hazards that demand precision and skill. Designed to test even the most experienced golfers, each hole presents its own unique challenges, requiring thoughtful strategy and masterful execution. Surrounded by breathtaking landscapes, our championship course provides an unparalleled golfing experience that combines the thrill of competition with the beauty of nature. Whether you're competing at the highest level or simply seeking an elite golfing experience, our championship course promises a memorable and rewarding journey through the sport of golf."</p>
                    <Button className="book" onClick={handleButtonClick}>Book a Tee-Time</Button>
                </Container>
            </Container>
        </Container>

    );
};


export default GolfCourse;