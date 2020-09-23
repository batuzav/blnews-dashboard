import React from "react";

export const CampaignEvent = ({ event }) => {
  const { title, userCreate } = event;
  return (
    <div style={{ flex: 1 }}>
      <strong>{title}</strong> <br />
      <p>- {userCreate.name}</p>
    </div>
  );
};
