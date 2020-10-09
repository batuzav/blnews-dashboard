import { apiCall } from "../services/api";
import { loginQuery, checkAuthQuery } from "../services/auth";
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

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const reStartFormAuth = () => ({
  type: types.authRestartForm,
});

export const authCheckingToken = () => ({
  type: types.authCheckingToken,
});

export const startLogin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(authChecking());
    console.log("heyLogin", email, password);
    try {
      const resp = await apiCall(loginQuery({ email, password }));
      console.log(resp.data.data.login);
      if (resp.data.data.login) {
        const { token, user } = resp.data.data.login;
        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(login(user));
      } else {
        dispatch(authError());
      }
    } catch (e) {
      dispatch(authError());
      console.log("e: >>>", e);
    }
  };
};

export const authTokenChecking = () => {
  const token = localStorage.getItem("token") || "";
  return async (dispatch) => {
    dispatch(authCheckingToken());
    try {
      const resp = await apiCall(checkAuthQuery(), token);
      if (resp.data.data.checkLogin) {
        const { isAuth, user } = resp.data.data.checkLogin;
        if (isAuth) {
          console.log('HOLA', user)
          dispatch(login(user));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("token-init-date");
          dispatch(authError());
        }
      }
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("token-init-date");
      dispatch(authError());
      console.log("e: >>>", e);
    }
  };
};
