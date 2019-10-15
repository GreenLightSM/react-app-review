import React, { Component } from "react";
import arrow from "../../img/left-arrow.svg";
import { Link } from "react-router-dom";

class TopLine extends Component {
  state = {};
  render() {
    return (
      <div className="top-line">
        <Link to="#" onClick={this.props.handleBack}>
          <img src={arrow} alt="#" />
        </Link>

        <div className="page-title">{this.props.pageTitle}</div>
      </div>
    );
  }
}

export default TopLine;
