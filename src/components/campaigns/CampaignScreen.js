import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from "../helpers/calendar-messages-es";
import moment from "moment";
import { Navbar } from "../ui/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./campaignsStyles.css";
import "moment/locale/es";
import { CampaignEvent } from "./CampaignEvent";
import { CampaignModal } from "./CampaignModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  campaignRemoveActive,
  campaignSetActive,
  getAllCampaigns,
} from "../../actions/campaign";
import { AddNewFab } from "../ui/AddNewFab";
import { DelatedCampaignFab } from "../ui/DelatedCampaignFab";
import { changePage } from "../../actions/auth";
import { Loading } from "../ui/Loading";
moment.locale("es");
const localizer = momentLocalizer(moment);

//Prueba de calendario;

export const CampaignScreen = () => {
  const dispatch = useDispatch();
  const { campaigns, activeCampaign, campaignLoadingToServer } = useSelector((state) => state.campaign);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(getAllCampaigns());
    
  }, [dispatch])
  
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event, start, end, isSelected);
    const style = {
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
      backgroundColor: "#ff7f2f",
    };
    return { style };
  };
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  const onSelect = (e) => {
    dispatch(campaignSetActive(e));
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };
  const onSelectSlot = (e) => {
    dispatch(campaignRemoveActive());
  };
  return (
    <>  
      <Navbar>
        <div className="calendar-screen">
          <h1>CAmpañas</h1>
          {campaignLoadingToServer ? <Loading /> : false}
          <Calendar
            localizer={localizer}
            events={campaigns}
            startAccessor="startDate"
            endAccessor="endDate"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            components={{
              event: CampaignEvent,
            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelect}
            onSelectSlot={onSelectSlot}
            selectable={true}
            onView={onViewChange}
            view={lastView}
          />
        </div>

        
        <AddNewFab />
        {activeCampaign !== null ? <DelatedCampaignFab /> : false}

        <CampaignModal />
      </Navbar>
    </>
  );
};
