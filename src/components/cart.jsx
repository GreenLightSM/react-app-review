import React, { Component } from "react";
import TopLine from "./common/topline";
import preloader from "../img/833.gif";
import { Redirect, Link } from "react-router-dom";
import CartItem from "./common/cartItem";
import SecondaryBtn from "./common/secondaryBtn";
import Switchers from "./common/switchers";
import BottomBtn from "./common/bottomBtn";
import closeimg from "../img/cancel-music.png";

class cart extends Component {
  state = {
    CartItems: [],
    backLink: "",
    redirectback: false,
    doUnmount: false,
    check: false,
    pack: false,
    redirect: false,
    fetching: true
  };

  switch = (e) => {
    if (e.target.id === "check") {
      if (e.target.checked) {
        this.setState({ check: true });
      } else {
        this.setState({ check: false });
      }
    } else if (e.target.id === "pack") {
      if (e.target.checked) {
        this.setState({ pack: true });
      } else {
        this.setState({ pack: false });
      }
    }
  };

  closePopup = (e) => {
    e.target.parentNode.parentNode.parentNode.parentNode.style.display = "none";
  };

  showPreloader = (e) => {
    if (this.state.fetching) {
      return <img src={preloader} alt="#" />;
    }
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

  handleSubmit = () => {
    let formData = new FormData();
    formData.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );
    formData.append("check", this.state.check);
    formData.append("packing", this.state.pack);

    fetch("https://dev.crm.inta.group/app/createorder", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.stringify(data.error)) {
          this.setState({
            display: "block",
            popupText: "Ошибка добавления заказа"
          });
          setTimeout(() => {
            this.setState({ display: "none" });
          }, 2000);
        } else {
          this.setState({ redirect: true });
        }
      })
      .catch((err) => console.log(err));
  };

  componentWillUnmount() {
    let history = sessionStorage.getItem("link");
    if (!this.state.doUnmount) {
      history += this.props.location.pathname;
    } else {
      history = sessionStorage.getItem("link");
    }
    sessionStorage.setItem("link", history);
  }

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

  render() {
    if (this.state.redirectback) {
      return <Redirect to={this.state.backLink} />;
    }
    if (this.state.redirect) {
      return <Redirect to="/successcart" />;
    }
    return (
      <div className="main-wrap page">
        <TopLine pageTitle="Корзина" handleBack={this.goBackCustom} />

        <div className="container cart-wrap">
          <div className="cart-items-wrap">
            <div className="preloader">{this.showPreloader()}</div>

            {this.state.CartItems ? (
              this.state.CartItems.map((item) => (
                <CartItem item={item} key={item.order_id} />
              ))
            ) : (
              <h2>У Вас пока нет товара</h2>
            )}
          </div>
          <SecondaryBtn
            linkTo="/addToCart"
            iconClass="fas fa-plus"
            btnTitle="Добавить товар"
          />
          <Switchers
            handleChange={this.switch}
            firstTitle="Отправить груз"
            hideStyle={{ display: "none" }}
            handlePopup={this.showPopup}
          />
          <div className="hint-cart-text">
            Ваш запрос будет отправлен на проверку на наличие товара у продавца.
          </div>
        </div>
        <BottomBtn btnTitle="Отправить на выкуп" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default cart;
