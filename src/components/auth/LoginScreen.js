import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../services/useForm";
import { CircularProgress } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./login.css";

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
  const { authLoading } = useSelector((state) => state.auth);
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { email, password } = formValues;
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(formValues));
    //
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
            </div>
          </div>

          <div className="col-md-6 login-form-2"></div>
        </div>
      </div>
    </ThemeProvider>
  );
};
