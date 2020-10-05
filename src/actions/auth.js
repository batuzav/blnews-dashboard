import { apiCall } from "../services/api";
import { loginQuery } from "../services/auth";
import { types } from "../types/types";

export const authChecking = () => ({
  type: types.authChecking,
});

export const authCheckingFinish = () => ({
  type: types.authCheckingFinish,
});

export const authError = () => ({
  type: types.authError,
});
export const authLogout = () => ({
  type: types.authLogout,
});

export const startLogin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(authChecking());
    console.log("heyLogin", email, password);
    try {
      const resp = await apiCall(loginQuery({ email, password }));
      console.log("resp", resp);
    } catch (e) {
      dispatch(authError());
      console.log("e: >>>", e);
    }
  };
};
