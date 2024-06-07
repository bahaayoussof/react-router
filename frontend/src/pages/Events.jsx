import React from "react";
import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  { id: "e1", title: "Event 1", location: "Location 1" },
  { id: "e2", title: "Event 2", location: "Location 2" },
  { id: "e3", title: "Event 3", location: "Location 3" },
  { id: "e4", title: "Event 4", location: "Location 4" },
  { id: "e5", title: "Event 5", location: "Location 5" },
];

const EventsPage = () => {
  return (
    <main>
      <h1>Events</h1>

      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default EventsPage;
