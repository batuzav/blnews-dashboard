import React from "react";
import PropTypes from "prop-types";
import "./navbar.css";

export const Navbar = ({ children }) => {
  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-logo">
          <img
            src={require("../../assets/BODYLOGIC-LOGO.png")}
            alt="BODY LOGIC"
          />
        </div>
        <ul className="sidebar-navigation">
          <li className="header">Campañas</li>
          <li>
            <a href="#">
              <i className="fa fa-home" aria-hidden="true" /> Ver Campañas
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-tablet-alt" aria-hidden="true" /> Comunicados
            </a>
          </li>
          <li className="header">Configuraciones</li>
          <li>
            <a href="#">
              <i className="fa fa-users" aria-hidden="true" /> Friends
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-cog" aria-hidden="true" /> Settings
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-info-circle" aria-hidden="true" /> Information
            </a>
          </li>
        </ul>
      </div>
      <div className="content-container">
        <div className="container-fluid">
          {/* Main component for a primary marketing message or call to action */}
          {children}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  children: PropTypes.any.isRequired,
};
