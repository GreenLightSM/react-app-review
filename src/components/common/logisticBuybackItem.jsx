import React, { Component } from "react";
import camera from "../../img/camera.png";
import { Link } from "react-router-dom";
import china from "../../img/china.png";
import ua from "../../img/ua.png";
import plane from "../../img/airplane-shape.svg";
import AddBtn from "./addBtn";

class LogisticBuybackItem extends Component {
  state = {
    statusWidth: 0,
    statusName: "",
    btnDisplasy: { display: "none", backgroundColor: "#007fff", color: "#fff" },
    btnText: "Отправить на доставку",
    opacity: { opacity: "1" },
    statusNameCss: { color: "#007fff", fontWeight: "bold" }
  };

  componentWillMount() {
    switch (this.props.item.status_id) {
      case 1:
        this.setState({ statusWidth: 20, statusName: "Проверяем" });
        break;
      case 2:
        this.setState({ statusWidth: 20, statusName: "Повторно проверяем" });
        break;
      case 3:
        this.setState({ statusWidth: 40, statusName: "Покупаем" });
        break;
      case 6:
        this.setState({ statusWidth: 60, statusName: "Купили" });
        break;
      case 4:
        this.setState({ statusWidth: 80, statusName: "Получили" });
        break;
      case 5:
        this.setState({
          statusWidth: 100,
          statusName: "Проверили на складе",
          btnDisplasy: { display: "block" },
          statusNameCss: { color: "#34bf9d", fontWeight: "bold" }
        });
        break;
      case 7:
        this.setState({
          statusWidth: 100,
          statusName: "Товар получен",
          btnDisplasy: {
            display: "block",
            backgroundColor: "#D6D6D6",
            color: "#bbb"
          },
          btnText: "Товар доставлен",
          opacity: { opacity: ".5" },
          statusNameCss: { color: "#34bf9d", fontWeight: "bold" }
        });
        break;
    }
  }

  render() {
    return (
      <Link
        to="/singleItemBuy"
        className="delivery-item"
        style={this.state.opacity}
      >
        <div className="delivery-info-wrap">
          <div className="delivery-image">
            <img src={require("../../img/delivery-item.jpg")} alt="#" />
            <img src={camera} alt="#" />
          </div>
          <div className="buying-right">
            <div className="delivery-main-info">
              <div className="delivery-title">
                CC-{this.props.item.order_id}
              </div>
              <ul>
                <li>Общее кол-во: 18</li>
                <li style={{ color: "#646464", marginTop: "5px" }}>
                  Косметика
                </li>
              </ul>
            </div>

            <div className="delivery-price">
              <div>Подробнее</div>
              <span>{this.props.item.total} USD</span>
            </div>
          </div>
        </div>
        <div className="delivery-date">
          <span>04.07.2019</span>
          <span style={this.state.statusNameCss}>{this.state.statusName}</span>
          <span>12.07.2019</span>
        </div>
        <div className="delivery-status">
          <img src={china} alt="#" />
          <div className="status-bar">
            <span
              style={{
                width: `${this.state.statusWidth}%`,
                backgroundColor:
                  this.state.statusWidth === 100 ? "#34bf9d" : "#007eff"
              }}
            >
              {" "}
              <i className="fas fa-shopping-cart" />
            </span>
          </div>
          <img src={ua} alt="#" />
        </div>
        <button style={this.state.btnDisplasy}>{this.state.btnText}</button>
      </Link>
    );
  }
}

export default LogisticBuybackItem;
