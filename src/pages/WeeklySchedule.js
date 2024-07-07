import React, { useState } from "react";
import "./WeeklySchedule.css"
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const times = Array(12).fill(null).map((_, i) => `${String(i + 8).padStart(2, "0")}:00`);

const WeeklySchedule = () => {
    const [bookings, setBookings] = useState({
        "Sunday": [{ time: "08:00", booking: "User Booking" }],
        "Saturday": [{ time: "08:00", booking: "Tournament" }]
    });

    const isBooked = (day, time) => {
        const dayBookings = bookings[day] || [];
        return dayBookings.find(booking => booking.time === time);
    };

    const renderCell = (day, time) => {
        const booking = isBooked(day, time);
        return (
            <div className={`cell ${booking ? "booked" : ""}`} key={`${day}-${time}`}>
                {booking ? booking.booking : ""}
            </div>
        );
    };

    return (
        <div className="calendar">
            <div className="header">
                <div className="cell time-header"></div>
                {days.map(day => <div className="cell day-header" key={day}>{day}</div>)}
            </div>
            {times.map(time => (
                <div className="row-t" key={time}>
                    <div className="cell time-cell">{time}</div>
                    {days.map(day => renderCell(day, time))}
                </div>
            ))}
        </div>
    );
}
export default WeeklySchedule;
