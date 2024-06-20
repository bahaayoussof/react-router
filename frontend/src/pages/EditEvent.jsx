import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventFrom from "../components/EventForm";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventFrom event={data.event} method="patch" />;
};

export default EditEventPage;

export async function action({ request, params }) {
  console.log("🚀 ~ action ~ request:", request);
  const data = await request.formData();
  const eventId = params.eventId;

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: "Failed to update event" }, { status: 500 });
  }

  return redirect("/events");
}
