import React, { useState, useEffect } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./WeeklySchedule.css"; // Make sure to link your CSS file here
import { useNavigate } from 'react-router-dom';
import { tournaments } from "../components/TournamentData";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeeklySchedule = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState({}); // State for storing bookings
    const [timeRange] = useState({ start: "06:30", end: "22:00" });
    const [currentWeek, setCurrentWeek] = useState(0);

    useEffect(() => {
        // Convert tournaments data to bookings format
        const bookingsData = tournaments.reduce((acc, tournament) => {
            const date = new Date(tournament.date);
            const day = days[date.getDay()];
            const booking = {
                bookingId: tournament.id.toString(),
                tournamentName: tournament.name,
                startTime: tournament.time,
                endTime: addHours(tournament.time, 2),
                date: format(date, 'MM/dd/yyyy')
            };
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push(booking);
            return acc;
        }, {});
        setBookings(bookingsData);
    }, []);

    // Helper function to add hours to a time string
    const addHours = (time, hours) => {
        const [hour, minute] = time.split(":").map(Number);
        const newHour = (hour + hours) % 24;
        return `${String(newHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    };

    // Generate an array of dates and format them
    const currentDate = new Date();
    const generateDatesArray = (currentWeek) => {
        const startDate = startOfWeek(addDays(currentDate, currentWeek * 7), { weekStartsOn: 0 });
        return Array.from({ length: 7 }, (_, index) => {
            const date = addDays(startDate, index);
            return { date, formattedDate: format(date, 'MM/dd/yyyy') }; // Format date as needed
        });
    };
    const dates = generateDatesArray(currentWeek);

    // Generate an array of times based on the selected time range
    const generateTimesArray = (start, end) => {
        const startHour = parseInt(start.split(":")[0], 10);
        const endHour = parseInt(end.split(":")[0], 10) + 2; // Add 2 hours to the end time
        return Array(endHour - startHour + 1).fill(null).map((_, i) => {
            const hour = (startHour + i) % 24; // Wrap around after 24 hours
            return `${String(hour).padStart(2, "0")}:00`;
        });
    };

    const times = generateTimesArray(timeRange.start, timeRange.end);

    const changeWeek = (amount) => {
        setCurrentWeek(prevWeek => prevWeek + amount);
    };

    const getBookingsForTimeSlot = (day, date, time) => {
        const dayBookings = bookings[day] || [];
        return dayBookings.filter(booking => {
            const bookingStart = parseInt(booking.startTime.split(":")[0], 10);
            const bookingEnd = booking.endTime ? parseInt(booking.endTime.split(":")[0], 10) : parseInt(booking.startTime.split(":")[0], 10) + 2;
            const currentHour = parseInt(time.split(":")[0], 10);
            const bookingDate = new Date(booking.date);
            const providedDate = new Date(date);
            return bookingDate.getTime() === providedDate.getTime() && currentHour >= bookingStart && currentHour < bookingEnd;
        });
    };

    // Function to render each cell in the weekly schedule grid
    const renderCell = (day, date, time) => {
        const timeSlotBookings = getBookingsForTimeSlot(day, date, time);
        return (
            <div className={`cell ${timeSlotBookings.length > 0 ? "booked" : ""}`} key={`${day}-${time}`}>
                <div className="cell-content">
                    {timeSlotBookings.map(booking => (
                        <div key={booking.bookingId} className="booking">
                            {booking.tournamentName}<br />
                            ({booking.startTime} - {booking.endTime})<br />
                            {booking.date}
                        </div>
                    ))}
                </div>
            </div>
        );
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
                    <h1>Weekly Schedule</h1>
                </Col>
                <Col sm={2}></Col>
            </Row>
            <h4> List of Up coming Events Hosted by the Club</h4>
            <Row className="time-header">
                <Col>
                    <Button className="date-btn" onClick={() => changeWeek(-1)}>Previous Week</Button>
                </Col>
                <Col>
                    <Button className="date-btn" onClick={() => changeWeek(1)}>Next Week</Button>
                </Col>
            </Row>
            <div className="calendar">
                <div className="header">
                    <div className="cell time-header"></div>
                    {days.map(day => (
                        <div className="cell day-header" key={day}>
                            <div className="day">{day}</div>
                            <div className="date">{dates[days.indexOf(day)].formattedDate}</div>
                        </div>
                    ))}
                </div>
                {times.map(time => (
                    <div className="row-t" key={time}>
                        <div className="cell time-cell">{time}</div>
                        {days.map(day => renderCell(day, dates[days.indexOf(day)].formattedDate, time))}
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default WeeklySchedule;