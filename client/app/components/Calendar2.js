import { useEffect, useState } from "react";
import "./calendar2.css"; // Import CSS file

const Calendar2 = () => {
  const [currentStartDate, setCurrentStartDate] = useState(
    new Date("2025-03-06")
  );
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3030/danceClass");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const renderCalendarHeader = (startDate) => {
    const options = { year: "numeric", month: "long" };
    return startDate.toLocaleDateString("en-US", options);
  };

  const renderCalendar = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + i);
      const dayStr = dayDate.toISOString().split("T")[0];

      days.push(
        <div className="day" key={dayStr}>
          <div className="date">
            <p className="date-num">{dayDate.getDate()}</p>
            <p className="date-day">
              {dayDate.toLocaleDateString("en-US", { weekday: "short" })}
            </p>
          </div>
          <div className="events">
            {events[dayStr] &&
              events[dayStr].map((event) => (
                <div
                  className="event"
                  key={event.title}
                  style={{
                    gridRow: `${event.start} / ${event.end}`,
                    backgroundColor: getRoomColor(event.Room),
                  }}
                >
                  <p className="title">
                    {event.title} - {event.tutor}
                  </p>
                  <p className="level">Level: {event.level}</p>
                  <p className="time">{event.time}</p>
                  <p className="room">Room: {event.Room}</p>
                </div>
              ))}
          </div>
        </div>
      );
    }
    return days;
  };

  const changeWeek = (direction) => {
    setCurrentStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + direction * 7);
      return newDate;
    });
  };

  const getRoomColor = (room) => {
    const colorPalette = ["#ffd6d1", "#fafaa3", "#e2f8ff", "#d1ffe6"];
    const roomColors = {};
    if (!roomColors[room]) {
      roomColors[room] =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
    }
    return roomColors[room];
  };

  return (
    <section id="calendarSection">
      <div className="calendar">
        <div className="controls">
          <button onClick={() => changeWeek(-1)} className="btn">
            Previous Week
          </button>
          <div id="calendarHeader" className="header">
            {renderCalendarHeader(currentStartDate)}
          </div>
          <button onClick={() => changeWeek(1)} className="btn">
            Next Week
          </button>
        </div>
        <div className="timeline">
          {/* Timeline logic can be added here if needed */}
        </div>
        <div className="days">{renderCalendar(currentStartDate)}</div>
      </div>
    </section>
  );
};

export default Calendar2;
