import { types } from "../types/types";

const initialState = {
  checking: true,
  uid: null,
  name: null,
  authLoading: false,
  authError: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authChecking:
      return {
        ...state,
        authLoading: true,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        authLoading: false,
      };
    case types.authError:
      return {
        ...state,
        authLoading: false,
        authError: true,
      };

    case types.authLogout:
      return initialState;

    default:
      return state;
  }
};
