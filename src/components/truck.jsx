import React, { Component } from "react";
import TopLine from "./common/topline";

import { Redirect } from "react-router-dom";
import BottomBtn from "./common/bottomBtn";
import Switchers from "./common/switchers";

class Truck extends Component {
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
        <TopLine pageTitle="Авто" handleBack={this.goBackCustom} />
        <div className="container delivery-order">
          <div className="input-wrap">
            <label htmlFor="#">Выберите откуда</label>
            <select
              name="#"
              id="#"
              placeholder="Выберите страну"
              onChange={(e) => {
                e.target.style.color = "#000";
              }}
            >
              <option value="0">Выберите страну</option>
              <option value="1">Украина</option>
            </select>
          </div>
          <div className="input-wrap">
            <label htmlFor="#">Категория товара</label>
            <select
              name="#"
              id="#"
              placeholder="Выберите страну"
              onChange={(e) => {
                e.target.style.color = "#000";
              }}
            >
              <option value="0">Выберите страну</option>
              <option value="1">Украина</option>
            </select>
          </div>
          <div className="input-wrap">
            <label htmlFor="#">Цена в USD</label>
            <input
              type="number"
              placeholder="1000"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "1000")}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="#">Вес в кг</label>
            <input
              type="number"
              placeholder="100"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "100")}
            />
          </div>
          <Switchers handleChange={this.switch} firstTitle="Проверка товара" />
        </div>
        <BottomBtn btnTitle="Оформить доставку" />
      </div>
    );
  }
}

export default Truck;
