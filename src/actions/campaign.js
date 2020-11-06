import { apiCall, imgurUploadApiCall } from "../services/api";
import { AddCapaignMutation as AddCapaignMutation, getAllCampaignsQuery, updateCampaignMutation } from "../services/campaigns";
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
export const imgBodyUploadedCorrectly = (link) => ({
  type: types.campaignUploadImgBody,
  payload: link,
});
export const imageUploadToImgurError = () => ({
  type: types.campaignImgUploadError,
})
export const imageBodyUploadToImgurError = () => ({
  type: types.campaignImgBodyUploadError,
});
export const campaignUploadServer = () => ({
  type: types.campaignUploadServer,
});
export const campaignUploadServerError = (msg) => ({
  type: types.campaignUploadServerError,
  payload: msg,
});

export const uploadImageToImgur = ({img="https://i.imgur.com/YYOjj4r.png", imgBody ="https://i.imgur.com/YYOjj4r.png"}) => {
    return async (dispatch) => {
      dispatch(imageUpoadingToImgur());
      if(img != "https://i.imgur.com/YYOjj4r.png"){
        try{
          const resp = await imgurUploadApiCall(img);
          if(resp.data.data){
            const { link } = resp.data.data; 
            dispatch(imageUpdatedCorrectly(link));
          }else{
            dispatch(imageUploadToImgurError());
          }      
        }catch(e) {
          console.log('e:  >>>>>>>>>>', e)
          dispatch(imageUpdatedCorrectly("https://i.imgur.com/YYOjj4r.png"))
        }
      }
    }
}

export const uploadImageBodyToImgur = ({imgBody}) => {
  const staticImg = "https://i.imgur.com/YYOjj4r.png";
  return async (dispatch) => {
    if(imgBody != "https://i.imgur.com/YYOjj4r.png"){
      try{
        const resp = await imgurUploadApiCall(imgBody);
        if(resp.data.data){
          const { link } = resp.data.data; 
          console.log("LINK TO SEE", link)
          dispatch(imgBodyUploadedCorrectly(link));
        }else{
          dispatch(imageBodyUploadToImgurError());
        }      
      }catch(e) {
        console.log('e:  >>>>>>>>>>', e)
        dispatch(imageBodyUploadToImgurError())
      }
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

export const campaignUpdating =  ({formValues, imgToUpdating, imgBodyToUpdating}) => {
  let urlImg = "";
  let urlBodyImg = "";
  console.log('imgBodyToUpdating>>>>>>', imgBodyToUpdating)
  return async (dispatch, store) => {
    dispatch(campaignUploadServer());
    if(imgToUpdating !== undefined){
      await dispatch(uploadImageToImgur({img: imgToUpdating}));
     urlImg = store().campaign.uploadedImgLink;
    }else{
      urlImg = formValues.usedImg;
    }
    if(imgBodyToUpdating !== undefined){
      console.log('ESNTRO')
      await dispatch(uploadImageBodyToImgur({imgBody: imgBodyToUpdating}));
      urlBodyImg = store().campaign.uploadedImgeBodyLink;
    }else{
      urlBodyImg = formValues.usedimageBody;
    }
    console.log('store', store());
    console.log('urlImg>>>>', urlImg)
    console.log('urlBodyImg>>>>', urlBodyImg)
    const refactoredCampaign = await refactorCampaign(formValues, 2, urlImg, urlBodyImg);
    console.log('update>>>>', refactoredCampaign)
    try{
      const token = localStorage.getItem("token") || "";
      const resp = await apiCall(updateCampaignMutation(refactoredCampaign), token);
      console.log('resp>>>>>', resp)
      if(resp.data.data.updateCampaign){
        const refactoredCampaigns = await refactorCampaign([resp.data.data.updateCampaign], 1);
        console.log('refactoredCampaigns', refactoredCampaigns)
        dispatch(getAllCampaigns());
        
      }else{
        dispatch(campaignUploadServerError("error al guardar"))
      }
    }catch (e){
      console.log('e>>>>>>>>>>', e)
      dispatch(campaignUploadServerError("ERROR AL GUARDAR"));
    }
    
  }
};
export const campaignCreating = ({formValues, imgToUpdating, imgBodyToUpdating}) => {
  const basicImage = "https://i.imgur.com/YYOjj4r.png";
  let urlImg = "";
  let urlBodyImg = "";
  return async (dispatch, store) => {
    dispatch(campaignUploadServer());
    console.log('imgBodyToUpdating>>> Action1', imgBodyToUpdating)
    if(formValues.img !== ""){
      await dispatch(uploadImageToImgur({img: imgToUpdating}));
      urlImg = store().campaign.uploadedImgLink;
    }else{
      urlImg = basicImage;
    }
    if(formValues.imageBody !== ""){
      await dispatch(uploadImageBodyToImgur({imgBody: imgBodyToUpdating}));
      urlBodyImg = store().campaign.uploadedImgeBodyLink;
    }else{
      urlBodyImg = basicImage;
    }
    const refactoredCampaign = await refactorCampaign(formValues, 2, urlImg, urlBodyImg);
    console.log('refactoredCampaign>>>>', refactoredCampaign)
    try{
      const token = localStorage.getItem("token") || "";
      const resp = await apiCall(AddCapaignMutation(refactoredCampaign), token);
      console.log('resp>>>>>', resp)
      if(resp.data.data.createCampaign){
        const refactoredCampaigns = await refactorCampaign([resp.data.data.createCampaign], 1);
        console.log('refactoredCampaigns', refactoredCampaigns)
        dispatch(campaignAddNew(refactoredCampaigns[0]));

      }else{
        dispatch(campaignUploadServerError("error al guardar"))
      }
    }catch (e){
      console.log('e>>>>>>>>>>', e)
      dispatch(campaignUploadServerError("ERROR AL GUARDAR"));
    }

  }
} 

export const campaignUpdated = (campaign) => ({
  type: types.campaignUpdateCampaign,
  payload: campaign,
});

export const campaignDelated = () => ({ type: types.campaignDelateCampaign });




