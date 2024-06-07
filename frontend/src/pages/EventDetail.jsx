import React from "react";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const { eventId } = useParams();

  return <div>EventDetailPage ~ {eventId}</div>;
};

export default EventDetailPage;
