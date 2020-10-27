import moment from "moment";
import { types } from "../types/types";
const now = moment().minutes(0).seconds(0).add(1, "hours");
const end = now.clone().add(1, "hours");
// {
//   id: 1,
//   title: "Batuza",
//   subtitle: "prueba",
//   country: [{ value: "MEX", label: "México" }],
//   category: [{value:"NOT", label: "Noticia"}],
//   img: "",
//   description: "ESTA ES UNA DESCRIPCION",
//   imageBody: "",
//   startDate: now.toDate(),
//   endDate: end.toDate(),
//   userCreate: { name: "Pedro" },
// },

const initialState = {
  campaigns: [],
  activeCampaign: null,
  getCampaignsIsLoading: false,
  campaignerrorMsg: "",
  uploadImgImageToImgur: false,
  uploadImgError: false,
  uploadedImgLink: "",
};

export const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.campaignSetActive:
      return {
        ...state,
        activeCampaign: action.payload,
      };
    case types.campaignAddNew:
      return {
        ...state,
        campaigns: [...state.campaigns, action.payload],
      };
    case types.campaignRemoveActive:
      return {
        ...state,
        activeCampaign: null,
      };
    case types.campaignUpdateCampaign:
      return {
        ...state,
        campaigns: state.campaigns.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case types.campaignDelateCampaign:
      return {
        ...state,
        campaigns: state.campaigns.filter(
          (e) => e.id !== state.activeCampaign.id
        ),
        activeCampaign: null,
      };
    case types.campaignUploadingImage: 
      return {
        ...state, 
        uploadImgImageToImgur: true,
      }
    case types.campaignUploadImg: 
    return {
      ...state,
      uploadImgImageToImgur: false,
      uploadImgError: false,
      uploadedImgLink: action.payload,
    }
    case types.campaignImgUploadError: 
    return {
      ...state,
      uploadImgError: true,
      uploadImgImageToImgur: false,
    }
    case types.campaignsGetStart:
      return{
        ...state,
        getCampaignsIsLoading: false,
      };
    case types.campaignServerError:
      return {
        ...initialState,
        campaignerrorMsg: "Error en el servidor"
      };
    case types.campaignGetAllCampaigns: 
    return {
      ...state,
      getCampaignsIsLoading: false, 
      campaigns: action.payload,
    }
    default:
      return state;
  }
};
