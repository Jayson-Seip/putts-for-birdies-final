import React, { useState } from "react";
import "./WeeklySchedule.css";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeeklySchedule = () => {
    const [bookings, setBookings] = useState({
        "Sunday": [{ start: "08:00", end: "10:00", booking: "User Booking" }],
        "Saturday": [{ start: "08:00", end: "12:00", booking: "Tournament" }]
    });

    const [timeRange, setTimeRange] = useState({ start: "08:00", end: "20:00" });

    const generateTimesArray = (start, end) => {
        const startHour = parseInt(start.split(":")[0], 10);
        const endHour = parseInt(end.split(":")[0], 10);
        return Array(endHour - startHour + 1).fill(null).map((_, i) => `${String(startHour + i).padStart(2, "0")}:00`);
    };

    const times = generateTimesArray(timeRange.start, timeRange.end);

    const isBooked = (day, time) => {
        const dayBookings = bookings[day] || [];
        return dayBookings.find(booking => {
            const bookingStart = parseInt(booking.start.split(":")[0], 10);
            const bookingEnd = parseInt(booking.end.split(":")[0], 10);
            const currentHour = parseInt(time.split(":")[0], 10);
            return currentHour >= bookingStart && currentHour < bookingEnd;
        });
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
        <div>
            <div>
                <label>
                    Start Time:
                    <input
                        type="time"
                        value={timeRange.start}
                        onChange={(e) => setTimeRange(prev => ({ ...prev, start: e.target.value }))}
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="time"
                        value={timeRange.end}
                        onChange={(e) => setTimeRange(prev => ({ ...prev, end: e.target.value }))}
                    />
                </label>
            </div>
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
        </div>
    );
};

export default WeeklySchedule;
