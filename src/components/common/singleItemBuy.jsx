import React, { Component } from "react";
import TopLine from "./topline";
import china from "../../img/china.png";
import ua from "../../img/ua.png";
import { Redirect } from "react-router-dom";
import CartItem from "./cartItem";
import BottomBtn from "./bottomBtn";

class SingleItemBuy extends Component {
  state = {
    backLink: "",
    redirectback: false,
    doUnmount: false,
    trackList: [],
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
    let formData = new FormData();
    formData.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );
    formData.append("buying_id", 0);

    fetch("https://dev.crm.inta.group/app/products", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ fetching: false, CartItems: data.products });
      })
      .catch((err) => console.log(err));
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
        />
        <TopLine pageTitle="BL-135" handleBack={this.goBackCustom} />
        <div className="item-wrap container">
          <div className="delivery-date">
            <span>04.07.2019</span>
            <span
              style={{
                color: "#007eff",
                fontWeight: "bold"
              }}
            >
              asdasd
            </span>
            <span>12.07.2019</span>
          </div>
          <div className="delivery-status">
            <img src={china} alt="#" />
            <div className="status-bar">
              <span>
                {" "}
                <i className="fas fa-shopping-cart" />
              </span>
            </div>
            <img src={ua} alt="#" />
          </div>

          <div className="goods-wrap">
            {this.state.CartItems ? (
              this.state.CartItems.map((item) => (
                <CartItem
                  item={item}
                  key={item.order_id}
                  hideIcons="true"
                  showImg="true"
                  handleImg={this.showImg}
                />
              ))
            ) : (
              <h2>У Вас пока нет товара</h2>
            )}
          </div>

          <div className="tracking">
            <ul>
              <li>
                <div />{" "}
                <span style={{ marginTop: "-7px", fontWeight: "bold" }}>
                  Отправление получено <br /> 12.05.2019
                </span>
              </li>
              <li style={{ marginTop: "-10px" }}>
                <div /> <span>Прибыло на наш склад в Украине</span>
              </li>
              <li>
                <div /> <span>Проходит таможенную очистку</span>
              </li>
              <li>
                <div /> <span>Прибыло в Украину</span>
              </li>
              <li>
                <div /> <span>Отправлено</span>
              </li>
              <li>
                <div />{" "}
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

export default SingleItemBuy;
