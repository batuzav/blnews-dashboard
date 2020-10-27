import { apiCall, imgurUploadApiCall } from "../services/api";
import { getAllCampaignsQuery } from "../services/campaigns";
import { refactorCampaign } from "../services/functions";
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

export const getCampaignStart = () => ({
  type: types.campaignsGetStart,
});

export const campaignServerError = () => ({
  type: types.campaignServerError,
});

export const imageUpoadingToImgur = () => ({
  type: types.campaignUploadingImage,
});

export const imageUpdatedCorrectly = (link) => ({
  type: types.campaignUploadImg,
  payload: link,
});
export const imageUploadToImgurError = () => ({
  type: types.campaignUpdatedImg,
})

export const uploadImageToImgur = (img) => {
    return async (dispatch) => {
      dispatch(imageUpoadingToImgur())
      console.log('img', img)
      try{
        const resp = await imgurUploadApiCall(img);
        console.log('resp', resp);
        if(resp.data.data){
          const { link } = resp.data.data; 
          dispatch(imageUpdatedCorrectly(link));
        }else{
          dispatch(imageUploadToImgurError())
        }        
      }catch(e) {
        console.log('ERROR', e);
        dispatch(imageUploadToImgurError())
      }
    }
}



export const getAllCampaigns = () => {
  return async (dispatch) => {
    dispatch(getCampaignStart());
    try{
      const token = localStorage.getItem("token") || "";
      const resp = await apiCall(getAllCampaignsQuery(), token);
      if(resp.data.data.getAllampaigns){
        const refactoredCampaigns = await refactorCampaign(resp.data.data.getAllampaigns, 1);
        dispatch(campaignGetAllCampaigns(refactoredCampaigns));
      }else{
        dispatch(campaignServerError())
      }

    }catch(e){
      dispatch(campaignServerError());
    }
  }
};

export const campaignUpdated = (campaign) => ({
  type: types.campaignUpdateCampaign,
  payload: campaign,
});

export const campaignDelated = () => ({ type: types.campaignDelateCampaign });




