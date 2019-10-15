import React, { Component } from "react";
import TopLine from "./topline";
import china from "../../img/china.png";
import ua from "../../img/ua.png";
import { Redirect } from "react-router-dom";
import BottomBtn from "./bottomBtn";

class SingleItem extends Component {
  state = {
    backLink: "",
    redirectback: false,
    doUnmount: false,
    CartItems: [],
    buttonStyle: { position: "relative", bottom: "0", marginLeft: "0" }
  };

  goBackCustom = () => {
    let link = sessionStorage
      .getItem("link")
      .split("/")
      .pop();
    let session = sessionStorage.getItem("link").split("/");

    let newSession = [];

    session.map((i, index) => {
      if (index !== session.length - 1) {
        newSession.push(i);
      }
    });

    this.setState({
      backLink: `/` + link,
      redirectback: true,
      doUnmount: true
    });

    sessionStorage.setItem("link", newSession.join("/"));
  };

  componentWillMount() {
    if (!sessionStorage.getItem("link")) {
      sessionStorage.setItem("link", "");
    }
  }

  componentWillUnmount() {
    let history = sessionStorage.getItem("link");
    if (!this.state.doUnmount) {
      history += this.props.location.pathname;
    } else {
      history = sessionStorage.getItem("link");
    }
    sessionStorage.setItem("link", history);
  }

  render() {
    if (this.state.redirectback) {
      return <Redirect to={this.state.backLink} />;
    }
    return (
      <div className="main-wrap page">
        <div
          className="overlay"
          onClick={this.closeImg}
          style={{ opacity: 0, display: "block", zIndex: "-1" }}
        ></div>
        <div className="popup-img" onClick={this.closeImg}>
          <img src="" alt="#" id="popup-img" />
        </div>
        <TopLine pageTitle="Test" handleBack={this.goBackCustom} />
        <div className="item-wrap container">
          <div className="item-img">
            <div className="item-img-wrap">
              <img
                src={require("../../img/delivery-item.jpg")}
                onClick={this.showImg}
                alt="#"
              />
              <img
                src={require("../../img/64372250_2406351522755075_1421299193296715776_o.jpg")}
                onClick={this.showImg}
                alt="#"
              />
              <img
                src={require("../../img/about.jpg")}
                onClick={this.showImg}
                alt="#"
              />
              <img
                src={require("../../img/about.jpg")}
                onClick={this.showImg}
                alt="#"
              />
              <img
                src={require("../../img/about.jpg")}
                onClick={this.showImg}
                alt="#"
              />
              <img
                src={require("../../img/about.jpg")}
                onClick={this.showImg}
                alt="#"
              />
              <img
                src={require("../../img/about.jpg")}
                onClick={this.showImg}
                alt="#"
              />
            </div>
            <div className="bottom-arrow">
              <i className="fas fa-arrows-alt-h"></i>
            </div>
          </div>
          <div className="delivery-date">
            <span>04.07.2019</span>
            <span
              style={{
                color: "#007eff",
                fontWeight: "bold"
              }}
            >
              {this.state.CartItems.status_name || "asdasd"}
            </span>
            <span>12.07.2019</span>
          </div>
          <div className="delivery-status">
            <img src={china} alt="#" />
            <div className="status-bar">
              <span
                style={{
                  width: this.state.CartItems.gotten ? "100%" : "33%",
                  backgroundColor: this.state.CartItems.gotten
                    ? "#34bf9d"
                    : "#007eff"
                }}
              >
                {" "}
                <i className="fas fa-shopping-cart" />
              </span>
            </div>
            <img src={ua} alt="#" />
          </div>
          <button
            style={{
              display: this.state.CartItems.gotten ? "block" : "none",
              backgroundColor: this.state.CartItems.delivered
                ? "#d6d6d6"
                : "#007eff",
              color: this.state.CartItems.delivered ? "#B1B1B1" : "#fff"
            }}
          >
            {this.state.CartItems.delivered
              ? "Товар доставлен"
              : "Отправить на доставку"}
          </button>

          <div className="si-char">
            <ul>
              <li>Вес: 3.5кг</li>
              <li style={{ marginTop: "-3px" }}>
                Обьём: 0.0003 м<sup>3</sup>
              </li>
              <li>Коробок: 11</li>
              <li>Кол-во: 20</li>
            </ul>
            <ul style={{ marginLeft: "50px" }}>
              <li>62318064085406</li>
              <li style={{ color: "#bbb" }}>Battery</li>
            </ul>
          </div>
          <div className="tracking">
            <ul>
              <li>
                <div></div>{" "}
                <span style={{ marginTop: "-7px", fontWeight: "bold" }}>
                  Отправление получено <br /> 12.05.2019
                </span>
              </li>
              <li style={{ marginTop: "-10px" }}>
                <div></div> <span>Прибыло на наш склад в Украине</span>
              </li>
              <li>
                <div></div> <span>Проходит таможенную очистку</span>
              </li>
              <li>
                <div></div> <span>Прибыло в Украину</span>
              </li>
              <li>
                <div></div> <span>Отправлено</span>
              </li>
              <li>
                <div></div>{" "}
                <span style={{ marginTop: "-7px" }}>
                  Получено на нашем складе в Китае <br /> 12.05.2019
                </span>
              </li>
            </ul>
          </div>
          <div className="si-bottom-info">
            <div className="sib-title">Адрес доставки</div>
            <div className="sib-text">
              Киев, ул. Линейная 17, Новая Почта №174
            </div>
          </div>
          <div className="si-bottom-info">
            <div className="sib-title">Оплачено</div>
            <div className="sib-text">3650 грн</div>
          </div>
          <BottomBtn
            btnTitle="Оплатить доставку"
            styles={this.state.buttonStyle}
          />
        </div>
      </div>
    );
  }
}

export default SingleItem;
