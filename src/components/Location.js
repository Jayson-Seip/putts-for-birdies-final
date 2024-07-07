import React from 'react';
import './Location.css'; // Assuming Location.css contains your custom styles

export const Location = () => {
    return (
        <div className="container-fluid mt-5" id="location">
            <h1 className="text-center text-header"> Where to Find Us</h1>
            <div className="row">
                <div className="col-md-8">
                    <iframe className="img-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.483870075305!2d-75.61055222444553!3d45.25822877107125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccde19df232ccd5%3A0xfa670e58d493f264!2s6357%20Emerald%20Links%20Dr%2C%20Greely%2C%20ON%20K4P%201M4!5e0!3m2!1sen!2sca!4v1720324698488!5m2!1sen!2sca" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                </div>

                <div className="col-md-4 border bg-light hours">
                    <div className="contact-details">

                        <h1 className="center-text"> Contact Us</h1>
                        <h4 className="left-align">Address: 6357 Emerald Links Drive</h4>
                        <h4 className="left-align">Opening Hours:</h4>
                        <ul className="left-align">
                            <li>Monday: 8:00 AM - 6:00 PM</li>
                            <li>Tuesday: 8:00 AM - 6:00 PM</li>
                            <li>Wednesday: 8:00 AM - 6:00 PM</li>
                            <li>Thursday: 8:00 AM - 6:00 PM</li>
                            <li>Friday: 8:00 AM - 6:00 PM</li>
                            <li>Saturday: 9:00 AM - 5:00 PM</li>
                            <li>Sunday: Appointment Only</li>
                        </ul>
                        <h4 className="left-align">Phone Number: 613-456-7890</h4>
                        <h4 className="left-align">Email: KentPhysioAndHealth@gmail.com</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};


