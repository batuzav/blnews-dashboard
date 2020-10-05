import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogout, startLogin } from "../../actions/auth";
import { useForm } from "../../services/useForm";
import { CircularProgress } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./login.css";
import { SnackbarCustom } from "../custom/Alerts";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ff7f2f",
    },
  },
});

export const LoginScreen = () => {
  const initialForm = {
    email: "",
    password: "",
  };
  const { authLoading, authError } = useSelector((state) => state.auth);
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { email, password } = formValues;
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(formValues));
    //
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(authLogout());
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <div className="form-container">
              <img className="logo" src={require("../../assets/logo.png")} />
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Correo"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group flex-group">
                  {authLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <input
                      type="submit"
                      className="btnSubmit align-items-center"
                      value="Iniciar Sesión"
                    />
                  )}
                </div>
              </form>
              <SnackbarCustom
                open={authError}
                duration={6000}
                handleClose={handleClose}
                type="error"
              >
                {" "}
                Error al iniciar sesión
              </SnackbarCustom>
            </div>
          </div>

          <div className="col-md-6 login-form-2"></div>
        </div>
      </div>
    </ThemeProvider>
  );
};
