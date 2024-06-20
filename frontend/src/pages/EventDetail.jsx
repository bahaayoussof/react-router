import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  console.log("🚀 ~ EventDetailPage ~ events:", events);

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Events...</p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvent(eventId) {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch data for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loader({ request, params }) {
  const eventId = params.eventId;

  return defer({
    event: await loadEvent(eventId),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const eventId = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Failed to delete event data." }, { status: 500 });
  }

  return redirect("/events");
}
