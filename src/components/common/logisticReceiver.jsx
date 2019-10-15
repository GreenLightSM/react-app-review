import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddBtn from "./addBtn";
import editImg from "../../img/edit.svg";
import deleteImg from "../../img/bin.svg";

class LogisticReceivers extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="receiver-item">
          <div className="receiver-top">
            <div className="rt-name">Bogdan Moroz</div>
            <span>
              <Link to="/editReceiver" className="edit-del-icons">
                <img src={editImg} onClick={this.setItemSessionID} alt="#" />
              </Link>
              <Link
                to="#"
                className="edit-del-icons"
                style={{ marginLeft: "5px" }}
              >
                <img src={deleteImg} alt="#" onClick={this.showPopup} />
              </Link>
            </span>
          </div>
          <ul>
            <li>Київ, 38(099)254-00-00</li>
            <li style={{ color: "#000", fontWeight: "bold" }}>
              Адрес доставки:
            </li>
            <li style={{ fontSize: "14px" }}>
              Україна, Київська обл. Київ, вул. Лобановського, до 31, кв. 141
            </li>
          </ul>
        </div>
        <AddBtn linkTo="/addReceiver" />
      </React.Fragment>
    );
  }
}

export default LogisticReceivers;
