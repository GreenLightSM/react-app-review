import React, { Component } from "react";
import TopLine from "./common/topline";
import { Redirect } from "react-router-dom";
import BottomBtn from "./common/bottomBtn";
import Switchers from "./common/switchers";
import coureImg from "../img/coure.png";

class Coure extends Component {
  state = {
    backLink: "",
    redirectback: false,
    doUnmount: false,
    check: false,
    pack: false
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

  render() {
    if (this.state.redirectback) {
      return <Redirect to={this.state.backLink} />;
    }
    return (
      <div className="main-wrap page">
        <TopLine pageTitle="Вызов курьера" handleBack={this.goBackCustom} />
        <div className="container delivery-order">
          <div className="do-img">
            <img src={coureImg} alt="#" />
          </div>
          <div className="input-wrap">
            <label htmlFor="#">Выберите получателя</label>
            <select
              name="#"
              id="#"
              onChange={(e) => {
                e.target.style.color = "#000";
              }}
            >
              <option value="0">Александр</option>
              <option value="1">Дмитрий</option>
            </select>
          </div>
          <div className="input-wrap">
            <label htmlFor="#">Выберите посылку</label>
            <select
              name="#"
              id="#"
              onChange={(e) => {
                e.target.style.color = "#000";
              }}
            >
              <option value="0">1</option>
              <option value="1">2</option>
            </select>
          </div>
          <div className="input-wrap">
            <label htmlFor="#">Выберите время доставки</label>
            <select
              name="#"
              id="#"
              placeholder="Выберите страну"
              onChange={(e) => {
                e.target.style.color = "#000";
              }}
            >
              <option value="0">1</option>
              <option value="1">2</option>
            </select>
          </div>
          <div className="input-wrap">
            <label htmlFor="#">Комментарий</label>
            <input
              type="number"
              placeholder="Пожелания"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Пожелания")}
            />
          </div>
          <Switchers
            handleChange={this.switch}
            hideStyle={{ display: "none" }}
            firstTitle="Не звонить"
          />
        </div>
        <BottomBtn btnTitle="Оформить доставку" />
      </div>
    );
  }
}

export default Coure;
