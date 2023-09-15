import "./index.css";

import EventBooking from "./eventbooking";

import EventHome from "./eventHome";
import { useState } from "react";

const EventManagement = () => {
  const [pageStage, setStage] = useState("Home");
  const [eventId, setEventId] = useState("");

  const settingPage = (value) => {
    setStage(value);
  };
  const settingEvent = (id) => {
    setEventId(id);
  };

  return (
    <>
      {pageStage === "Home" ? (
        <EventHome settingPage={settingPage} settingEvent={settingEvent} />
      ) : (
        <EventBooking
          pageStage={pageStage}
          settingPage={settingPage}
          eventId={eventId}
        />
      )}
    </>
  );
};

export default EventManagement;
