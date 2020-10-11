import React from "react";
import PropTypes from "prop-types";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../actions/auth";
import { history } from "../../routers/AppRouter";
import {Link} from 'react-router-dom';

export const Navbar = ({ children }) => {
  const dispatch = useDispatch();
  const {actualPage} = useSelector(state => state.auth)

  const handleNavBar = (goTo) =>{
    dispatch(changePage(goTo))
    history.push(`/${goTo}`);

  }
  return (
    <div>
      <div className="sidebar-container">
        <Link to="/home">
          <div className="sidebar-logo" onClick={()=>handleNavBar("home")}>
          
            <img
              src={require("../../assets/BODYLOGIC-LOGO.png")}
              alt="BODY LOGIC"
            />
          </div>
        </Link>
        <ul className="sidebar-navigation">
          <li className="header">Campañas</li>
          <li onClick={()=>handleNavBar("campañas")} style={{backgroundColor: actualPage==="campañas" ? "#ff7f2f" : false }}>
            <Link to="/campañas">
              <i className="fa fa-home" aria-hidden="true" /> Ver Campañas
            </Link>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-tablet-alt" aria-hidden="true" /> Comunicados
            </a>
          </li>
          <li className="header">Configuraciones</li>
          {/* <li>
            <a href="#">
              <i className="fa fa-users" aria-hidden="true" /> Friends
            </a>
          </li> */}
          <li>
            <a href="#">
              <i className="fa fa-cog" aria-hidden="true" /> Configuraciones
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
