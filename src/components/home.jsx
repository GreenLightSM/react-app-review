import React, { Component } from "react";
import logo from "../img/logo.png";
import plane from "../img/airplane-shape.svg";
import { Link } from "react-router-dom";
import Count from "./common/count";
import watchImg from "../img/time.svg";
import boxesImg from "../img/boxes.svg";
import planeImg from "../img/aeroplane.svg";
import giftImg from "../img/gift.svg";
import searchImg from "../img/search.svg";
import listImg from "../img/list.svg";
import cartImg from "../img/shopping-cart.svg";

class Home extends Component {
  state = {
    topLineRef: React.createRef(),
    topLineHeight: 0,
    backLink: "",
    redirectback: false,
    doUnmount: false,
    balance: 0
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

  componentWillUnmount() {
    let history = sessionStorage.getItem("link");
    if (!this.state.doUnmount) {
      history += this.props.location.pathname;
    } else {
      history = sessionStorage.getItem("link");
    }
    sessionStorage.setItem("link", history);
  }

  componentDidMount() {
    this.setState({
      topLineHeight: this.state.topLineRef.current.clientHeight
    });
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

    fetch("https://dev.crm.inta.group/app/payments", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          balance: data.balance
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="main-wrap page" style={{ overflow: "hidden" }}>
        <div className="home-top-line" ref={this.state.topLineRef}>
          <ul>
            <li>
              <Link to="/finance" className="home-top-line-list-content">
                <i className="fas fa-wallet" style={{ fontSize: "16px" }} />
                <br /> {this.state.balance}$
              </Link>
            </li>
            <li>
              <Link to="#" className="home-top-line-list-content">
                <img src={logo} alt="logo" />
                <br />
                <span>flimcor support</span>
              </Link>
              <div className="sup-status" />
            </li>
            <li>
              <Link to="/profile" className="home-top-line-list-content">
                <i className="fas fa-user" style={{ fontSize: "16px" }} />
                <br />
                Профиль
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="home-wrap"
          style={{
            height: `calc(100vh - ${this.state.topLineHeight + 50}px)`
          }}
        >
          <div className="home-menu">
            <Count
              title="Мои доставки"
              img1={watchImg}
              img2={boxesImg}
              img3={planeImg}
              img4={giftImg}
              title1="Ожидаются"
              title2="Пришли"
              title3="Отправленны"
              title4="Прибыли"
            />
            <Count
              title="Мои товары"
              style={{ display: "none" }}
              img1={searchImg}
              img2={listImg}
              img3={cartImg}
              title1="Проверяются"
              title2="К оплате"
              title3="Выкупается"
            />
            <div className="hc-title">Сделать заказ</div>
            <div className="home-btns">
              <Link to="/avia">
                <img src={plane} alt="#" /> Заказать доставку
              </Link>
              <Link to="/addToCart">
                <img src={cartImg} alt="#" /> Выкуп товаров
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
