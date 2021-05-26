import React from "react";

export const EventDetail = ({ event }) => {
  const { title, name } = event;
  return (
    <div>
      <span> {title}</span>
    </div>
  );
};
