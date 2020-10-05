import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { campaignReducer } from "./campaignReducer";
import { uiReducer } from "./uiReducers";

export const rootreducer = combineReducers({
  ui: uiReducer,
  campaign: campaignReducer,
  auth: authReducer,
});
