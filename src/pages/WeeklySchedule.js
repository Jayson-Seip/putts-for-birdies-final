import React, { useState, useEffect } from "react";
import "./WeeklySchedule.css";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeeklySchedule = () => {
    const [bookings, setBookings] = useState({}); // State for storing bookings
    const [timeRange, setTimeRange] = useState({ start: "08:00", end: "20:00" });
    const [storedBooking, setStoredBooking] = useState({});

    useEffect(() => {
        // Hardcoded bookings data
        const hardcodedBookings = {
            "Monday": [
                {
                    bookingId: "1",
                    tournamentName: "Charity Tournament",
                    startTime: "10:00",
                    endTime: "12:00"
                },
                {
                    bookingId: "2",
                    tournamentName: "Junior Tournament",
                    startTime: "14:00",
                    endTime: "16:00"
                }
            ],
            "Wednesday": [
                {
                    bookingId: "3",
                    tournamentName: "Senior Tournament",
                    startTime: "09:00",
                    endTime: "11:00"
                }
            ],
            "Friday": [
                {
                    bookingId: "4",
                    tournamentName: "Night Golf Tournament",
                    startTime: "18:00",
                    endTime: "20:00"
                }
            ]
        };

        const storedBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
        console.log(storedBookings);
        const combinedBookings = { ...hardcodedBookings };
        const localBooking = [];
        console.log(localBooking);
        // Merge stored bookings with hardcoded bookings
        Object.keys(storedBookings).forEach(key => {
            const booking = storedBookings[key];
            console.log(booking);
            const dayOfWeek = booking.selectedDay;
            console.log(dayOfWeek);

            // Initialize an object for the day if it doesn't exist in hardcodedBookings
            if (!localBooking[dayOfWeek]) {
                localBooking[dayOfWeek] = [];
            }

            // Add the booking details into the object for the corresponding day
            localBooking[dayOfWeek].push({
                tournamentName: booking.tournamentName,
                startTime: booking.startTime,
                endTime: booking.endTime
            });
        });
        console.log(localBooking['Saturday']);
        console.log(combinedBookings['Wednesday']);
        console.log()
        Object.keys(localBooking).forEach(dayOfWeek => {
            // Check if the dayOfWeek exists in combinedBookings
            if (!combinedBookings[dayOfWeek]) {
                combinedBookings[dayOfWeek] = [];
            }
            if (combinedBookings[dayOfWeek]) {
                // Concatenate localBooking entries for the dayOfWeek with existing combinedBookings entries
                console.log(localBooking[dayOfWeek]);
                combinedBookings[dayOfWeek] = [...combinedBookings[dayOfWeek], ...localBooking[dayOfWeek]];
            } else {
                // If dayOfWeek doesn't exist in combinedBookings, initialize it with localBooking entries
                console.log(localBooking[dayOfWeek]);
                combinedBookings[dayOfWeek] = [...localBooking[dayOfWeek]];
                console.log(combinedBookings);
            }
        });


        setBookings(combinedBookings);
        console.log(combinedBookings);
    }, []);

    // Generate an array of times based on the selected time range
    const generateTimesArray = (start, end) => {
        const startHour = parseInt(start.split(":")[0], 10);
        const endHour = parseInt(end.split(":")[0], 10) + 2; // Add 2 hours to the end time
        return Array(endHour - startHour + 1).fill(null).map((_, i) => `${String(startHour + i).padStart(2, "0")}:00`);
    };

    const times = generateTimesArray(timeRange.start, timeRange.end);

    // Function to check if a specific time slot on a day is booked
    const getBookingsForTimeSlot = (day, time) => {

        const dayBookings = bookings[day] || [];
        return dayBookings.filter(booking => {
            const bookingStart = parseInt(booking.startTime.split(":")[0], 10);
            const bookingEnd = booking.endTime ? parseInt(booking.endTime.split(":")[0], 10) : parseInt(booking.startTime.split(":")[0], 10) + 3;
            const currentHour = parseInt(time.split(":")[0], 10);
            return currentHour >= bookingStart && currentHour < bookingEnd;
        });
    };

    // Function to render each cell in the weekly schedule grid
    const renderCell = (day, time) => {
        const timeSlotBookings = getBookingsForTimeSlot(day, time);
        return (
            <div className={`cell ${timeSlotBookings.length > 0 ? "booked" : ""}`} key={`${day}-${time}`}>
                {timeSlotBookings.map(booking => (
                    <div key={booking.bookingId} className="booking">
                        {booking.tournamentName} ({booking.startTime} - {booking.endTime})
                    </div>
                ))}
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
