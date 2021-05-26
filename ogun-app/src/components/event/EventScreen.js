import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { messages } from "../../helpers/calendar-messages";
import { EventDetail } from "./EventDetail";
import { EventModal } from "./EventModal";

import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AddNewFab } from "../../ui/AddNewFab";
import { DeleteEventFab } from "../../ui/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const EventScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.events);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onSelectSlot = (e) => {
    if(activeEvent){
    dispatch(eventClearActiveEvent(e));}
    else {
      dispatch(uiOpenModal());
    }
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
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: EventDetail,
        }}
      />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}

      <EventModal />
    </div>
  );
};
