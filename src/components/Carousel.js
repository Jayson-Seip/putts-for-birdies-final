import React from 'react';
import { Container, Image } from 'react-bootstrap';
import './Carousel.css';


function CarouselImg() {
    return (
        <Container fluid className="carousel-container">
            <Image src={process.env.PUBLIC_URL + '/images/pexels-nathan-nedley-20160-92858.jpg'} className="top-image"></Image>

        </Container>
    );
}

export default CarouselImg;
