import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch } from "react-redux";
import moment from "moment";

import { messages } from "../../helpers/calendar-messages";
import { EventDetail } from "./EventDetail";
import { EventModal } from "./EventModal";

import { uiOpenModal } from "../../actions/ui";
import { eventSetActive } from "../../actions/events";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AddNewFab } from "../../ui/AddNewFab";


moment.locale("es");
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "cumpleaños",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
  },
];

export const EventScreen = () => {
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() ); 
  }

  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e) ); 
    dispatch( uiOpenModal());

  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <div className="events-screen">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: EventDetail,
        }}
      />
      <AddNewFab/>
      <EventModal />
    </div>
  );
};
