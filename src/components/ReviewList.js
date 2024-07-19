
import React from 'react';

const ReviewList = ({ reviews }) => (
    <div className="review-list">
        <h2>Reviews:</h2>
        {reviews.map((review, index) => (
            <div key={index} className="review">
                <h3>{review.name}</h3>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
            </div>
        ))}
    </div>
);

export default ReviewList;
