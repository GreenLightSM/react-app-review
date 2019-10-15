import React, { Component } from "react";
import TopLine from "./topline";
import BottomBtn from "./bottomBtn";
import { Redirect } from "react-router-dom";
import closeimg from "../../img/cancel-music.png";

class AddReceiver extends Component {
  state = {
    backLink: "",
    redirectback: false,
    doUnmount: false,
    item: {
      name: "",
      city: "",
      tel: "",
      address: ""
    },
    redirect: false
  };

  handleChange = ({ currentTarget: input }) => {
    const item = { ...this.state.item };
    item[input.name] = input.value;
    this.setState({ item });
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
    if (this.state.redirect) {
      return <Redirect to="/cart" />;
    }
    return (
      <div className="main-wrap page">
        <div
          className="wrong-pass-popup"
          style={{ display: this.state.display }}
        >
          {this.state.popupText}
        </div>

        <TopLine
          pageTitle="Добавить получателя"
          handleBack={this.goBackCustom}
        />
        <div className="addToCart-wrap container">
          <div className="input-wrap-add">
            <input
              type="text"
              name="name"
              placeholder="ФИО"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "ФИО")}
              onChange={this.handleChange}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-title"
            ></i>
          </div>
          <div className="input-wrap-add">
            <input
              type="text"
              name="city"
              placeholder="Город"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Город")}
              onChange={this.handleChange}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-link"
            ></i>
          </div>
          <div className="input-wrap-add">
            <input
              type="tel"
              name="tel"
              placeholder="Телефон"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Телефон")}
              onChange={this.handleChange}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-amount"
            ></i>
          </div>
          <div className="input-wrap-add">
            <input
              type="text"
              placeholder="Адрес"
              name="address"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Адрес")}
              onChange={this.handleChange}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-desc"
            ></i>
          </div>
        </div>
        <BottomBtn btnTitle="Добавить" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default AddReceiver;
