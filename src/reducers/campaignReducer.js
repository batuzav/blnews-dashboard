import moment from "moment";
import { types } from "../types/types";
const now = moment().minutes(0).seconds(0).add(1, "hours");
const end = now.clone().add(1, "hours");

const initialState = {
  campaigns: [
    {
      title: "Batuza",
      subtitle: "prueba",
      country: [{ value: "MEX", label: "México" }],
      img: "",
      description: "ESTA ES UNA DESCRIPCION",
      imageBody: "",
      startDate: now.toDate(),
      endDate: end.toDate(),
      userCreate: { name: "Pedro" },
    },
  ],
  activeCampaign: null,
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
    default:
      return state;
  }
};
