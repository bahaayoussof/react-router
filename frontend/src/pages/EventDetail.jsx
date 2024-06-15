import React from "react";
import { useLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useLoaderData();

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export async function loader({ request, params }) {
  console.log("🚀 ~ loader ~ request:", request);
  const response = await fetch(
    `http://localhost:8080/events/${params.eventId}`
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch data for selected event." },
      { status: 500 }
    );
  } else {
    return response;
  }
}
