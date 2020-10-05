import { types } from "../types/types";

const initialState = {
  checking: true,
  uid: null,
  name: null,
  authLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authChecking:
      return {
        ...state,
        authLoading: true,
      };

    default:
      return state;
  }
};
