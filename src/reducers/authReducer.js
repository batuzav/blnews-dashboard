import { types } from "../types/types";

const initialState = {
  checking: false,
  uid: null,
  name: null,
  authLoading: false,
  authError: false,
  isAuth: false,
  typeUser: "",
  checkingToken: false,
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
    case types.authLogin:
      return {
        ...state,
        checking: true,
        isAuth: true,
        uid: action.payload._id,
        name: action.payload.firstName,
        typeUser: action.payload.typeUser,
      };
    case types.authRestartForm:
      return {
        ...state,
        checking: false,
        authError: false,
      };
    case types.authCheckingToken:
      return {
        ...state,
        checkingToken: true,
      };

    case types.authLogout:
      return initialState;

    default:
      return state;
  }
};
