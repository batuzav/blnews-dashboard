import React from "react";
import { useDispatch } from "react-redux";
import { campaignDelated } from "../../actions/campaign";

export const DelatedCampaignFab = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={() => dispatch(campaignDelated())}
    >
      <i className="fa fa-trash"></i>
      <span> </span>
    </button>
  );
};
