import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const NavBar = props => {
  return (
    <ul className="main-menu" id="main-menu">
      <li>
        <NavLink to="/home" activeClassName="active-menu">
          <i className="fas fa-ellipsis-v" />
          <i className="fas fa-ellipsis-v" />
          <i className="fas fa-ellipsis-v" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/logistic" activeClassName="active-menu">
          <i className="fas fa-cube" />
          <span className="menu-count">5</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart" activeClassName="active-menu">
          <i className="fas fa-plus-square" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/finance" activeClassName="active-menu">
          <i className="fas fa-wallet" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/communications" activeClassName="active-menu">
          <i className="fas fa-comment-dots" />
        </NavLink>
      </li>
    </ul>
  );
};

export default withRouter(NavBar);
