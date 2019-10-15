import React, { Component } from "react";
import TopLine from "./topline";
import BottomBtn from "./bottomBtn";
import { Redirect } from "react-router-dom";
import closeimg from "../../img/cancel-music.png";

class Edit extends Component {
  state = {
    item: {
      title: "",
      link: "",
      amount: "",
      description: "",
      type_delivery: 0
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

  handleSubmit = () => {
    // -----------

    let formData = new FormData();
    formData.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );
    formData.append("order_id", sessionStorage.getItem("order_id"));
    formData.append("title", this.state.item.title);
    formData.append("link", this.state.item.link);
    formData.append("amount", this.state.item.amount);
    formData.append("description", this.state.item.description);
    formData.append("type_delivery", this.state.item.type_delivery);

    fetch("https://dev.crm.inta.group/app/editorder", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.stringify(data.error)) {
          this.setState({ display: "block", popupText: "Ошибка" });
          setTimeout(() => {
            this.setState({ display: "none" });
          }, 2000);
        } else {
          this.setState({
            display: "block",
            popupText: "Товар успешно отредактиорван"
          });
          setTimeout(() => {
            this.setState({ display: "none", redirect: true });
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
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

    // -----

    // ----

    let formData = new FormData();
    formData.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "order_id",
      sessionStorage.getItem("order_id").replace(/[^\w\s]/gi, "")
    );

    fetch("https://dev.crm.inta.group/app/product", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          existItem: {
            title: data.title,
            link: data.link,
            amount: data.amount,
            description: data.description,
            type_delivery: data.type_delivery
          }
        });
      })
      .then(() => {
        this.setState({
          item: {
            title: this.state.existItem.title,
            link: this.state.existItem.link,
            amount: this.state.existItem.amount,
            description: this.state.existItem.description,
            type_delivery: this.state.existItem.type_delivery
          }
        });
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
              name="title"
              placeholder="Название товара"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Название товара")}
              onChange={this.handleChange}
              defaultValue={this.state.existItem.title}
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
              name="link"
              placeholder="Ccылка на товар"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Ccылка на товар")}
              onChange={this.handleChange}
              defaultValue={this.state.existItem.link}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-link"
            ></i>
          </div>
          <div className="input-wrap-add">
            <input
              type="number"
              name="amount"
              placeholder="Количество"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Количество")}
              onChange={this.handleChange}
              defaultValue={this.state.existItem.amount}
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
              placeholder="Пожелания"
              name="description"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Пожелания")}
              onChange={this.handleChange}
              defaultValue={this.state.existItem.description}
            />
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-desc"
            ></i>
          </div>
          <div className="input-wrap-add">
            <select onChange={this.handleChange} name="type_delivery" id="#">
              <option
                value="0"
                selected={
                  this.state.existItem.type_delivery === 0 ? "selected" : ""
                }
              >
                Выберете способ доставки
              </option>
              <option
                value="1"
                selected={
                  this.state.existItem.type_delivery === 1 ? "selected" : ""
                }
              >
                Авиа
              </option>
              <option
                value="2"
                selected={
                  this.state.existItem.type_delivery === 2 ? "selected" : ""
                }
              >
                Море
              </option>
              <option
                value="3"
                selected={
                  this.state.existItem.type_delivery === 3 ? "selected" : ""
                }
              >
                ЖД
              </option>
            </select>
            <i
              className="far fa-question-circle"
              onClick={this.openPopup}
              data-popup="popup-delivery"
            ></i>
          </div>
        </div>
        <BottomBtn btnTitle="Редактировать" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default Edit;
