import React from "react";

export const CampaignEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <div style={{ flex: 1 }}>
      <strong>{title}</strong> <br />
      <p>- </p>
    </div>
  );
};
