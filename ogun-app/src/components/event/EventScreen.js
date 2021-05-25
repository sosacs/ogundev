import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { messages } from '../../helpers/calendar-messages';
import { EventDetail } from './EventDetail';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';


moment.locale('es');
const localizer = momentLocalizer(moment)

const events = [{
    title : 'cumpleaños',
    start : moment().toDate(), 
    end : moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa'
}]

export const EventScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
const onDoubleClick = (e) => {
    console.log(e);
}

const onSelectEvent = (e) => {
    console.log(e);
}
const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
}


    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style 
        }
    };


    return (
        <div className="events-screen">
      
            <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={ messages }
      eventPropGetter={ eventStyleGetter }
      onDoubleClickEvent= { onDoubleClick }
      onSelectEvent = { onSelectEvent }
      onView= { onViewChange }
      view= { lastView }
      components={{
          event: EventDetail
      }}
    />
        </div>
    )
}
