import React from "react";
import { Link } from "react-router-dom";

const SecondaryBtn = props => {
  return (
    <Link
      to={props.linkTo || "#"}
      className="secondary-btn"
      style={props.style}
      onClick={props.onClick}
    >
      <i className={props.iconClass}></i> {props.btnTitle}
    </Link>
  );
};

export default SecondaryBtn;
