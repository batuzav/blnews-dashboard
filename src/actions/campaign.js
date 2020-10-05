import { apiCall } from "../services/api";
import { getAllCampaignsQuery } from "../services/campaigns";
import { types } from "../types/types";

export const campaignAddNew = (campaign) => ({
  type: types.campaignAddNew,
  payload: campaign,
});
export const campaignSetActive = (campaign) => ({
  type: types.campaignSetActive,
  payload: campaign,
});

export const campaignRemoveActive = () => ({
  type: types.campaignRemoveActive,
});

export const campaignGetAllCampaigns = (campaigns) => ({
  type: types.campaignGetAllCampaigns,
  payload: campaigns,
});

// export const getAllCampaigns = () => {
//   };
// };

export const campaignUpdated = (campaign) => ({
  type: types.campaignUpdateCampaign,
  payload: campaign,
});

export const campaignDelated = () => ({ type: types.campaignDelateCampaign });
