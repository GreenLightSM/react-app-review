import React, { Component } from "react";
import TopLine from "./topline";
import NavBar from "./navbar";
import BottomBtn from "./bottomBtn";
import { Redirect } from "react-router-dom";
import closeimg from "../../img/cancel-music.png";

class EditReceiver extends Component {
  state = {
    item: {
      fio: "",
      city: "",
      phone: "",
      address: ""
    },
    redirectback: false,
    backLink: "",
    doUnmount: false,
    display: "none",
    popupText: "",
    existItem: {
      title: "",
      link: "",
      amount: "",
      description: "",
      type_delivery: ""
    },
    selectRef: React.createRef()
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
        <TopLine pageTitle="Редактирование" handleBack={this.goBackCustom} />
        <div className="addToCart-wrap container">
          <div className="input-wrap-add">
            <input
              type="text"
              name="fio"
              placeholder="ФИО"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "ФИО")}
              onChange={this.handleChange}
              defaultValue={this.state.existItem.title}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-title"
            />
          </div>
          <div className="input-wrap-add">
            <input
              type="text"
              name="city"
              placeholder="Ваш город"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Ваш город")}
              onChange={this.handleChange}
              defaultValue={this.state.existItem.link}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-link"
            />
          </div>
          <div className="input-wrap-add">
            <input
              type="text"
              name="address"
              placeholder="Адрес доставки"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Адрес доставки")}
              onChange={this.handleChange}
              defaultValue={this.state.existItem.amount}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-amount"
            />
          </div>
        </div>
        <BottomBtn btnTitle="Редактировать" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default EditReceiver;
