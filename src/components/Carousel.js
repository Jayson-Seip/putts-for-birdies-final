import React from 'react';
import { Container, Image } from 'react-bootstrap';
import './Carousel.css';

function CarouselImg() {
    return (
        <Container fluid className="carousel-container">
            <Image src="/images/pexels-nathan-nedley-20160-92858.jpg" className="top-image"></Image>

        </Container>
    );
}

export default CarouselImg;
