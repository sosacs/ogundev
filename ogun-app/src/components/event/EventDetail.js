import React from "react";

export const EventDetail = ({ event }) => {
  const { tittle, location } = event;
  return (
    <div>
      <span> {tittle}</span>
      <span> {location}</span>
    </div>
  );
};
