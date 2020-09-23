import React from "react";
import "./login.css";

export const LoginScreen = () => {
  return (
    <div className="login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <div className="form-container">
            <img className="logo" src={require("../../assets/logo.png")} />
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                />
              </div>
              <div className="form-group flex-group">
                <input
                  type="submit"
                  className="btnSubmit align-items-center"
                  value="Iniciar Sesión"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-6 login-form-2"></div>
      </div>
    </div>
  );
};
