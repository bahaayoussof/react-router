import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import EventFrom from "../components/EventForm";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventFrom event={data.event} />;
};

export default EditEventPage;
