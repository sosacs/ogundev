import React from "react";

export const EventDetail = ({ event }) => {
  const { title, location, notes } = event;
  return (
    <div>
      <span> {title}</span>
      <span> {location}</span>
      <span> {notes}</span>
    </div>
  );
};
