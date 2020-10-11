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
  actualPage: "home"
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
        checkingToken: false,
        authLoading: false,
        authError: true,
      };
    case types.authLogin:
      return {
        ...state,
        checkingToken:false,
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
    case types.pageChange: 
    return{
      ...state,
      actualPage: action.payload,
    }

    case types.authLogout:
      return initialState;

    default:
      return state;
  }
};
