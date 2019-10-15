import React, { Component } from "react";
import TopLine from "./topline";
import NavBar from "./navbar";
import BottomBtn from "./bottomBtn";
import { Redirect } from "react-router-dom";
import closeimg from "../../img/cancel-music.png";

class addToCart extends Component {
  state = {
    backLink: "",
    redirectback: false,
    doUnmount: false,
    item: {
      title: "",
      link: "",
      amount: "",
      description: "",
      type_delivery: 0
    },
    redirect: false
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
    formData.append("title", this.state.item.title);
    formData.append("link", this.state.item.link);
    formData.append("amount", this.state.item.amount);
    formData.append("description", this.state.item.description);
    formData.append("type_delivery", this.state.item.type_delivery);

    fetch("https://dev.crm.inta.group/app/addorder", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.stringify(data.error)) {
          console.log(data);
          this.setState({
            display: "block",
            popupText: "Ошибка добавления товара"
          });

          setTimeout(() => {
            this.setState({ display: "none" });
          }, 2000);
        } else {
          this.setState({
            display: "block",
            popupText: "Товар успешно добавлен!"
          });
          setTimeout(() => {
            this.setState({ display: "none", redirect: true });
          }, 1000);
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
        <TopLine pageTitle="Добавить товар" handleBack={this.goBackCustom} />
        <div className="addToCart-wrap container">
          <div className="input-wrap-add">
            <input
              type="text"
              name="title"
              placeholder="Название товара"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Название товара")}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-wrap-add">
            <input
              type="text"
              name="link"
              placeholder="Ccылка на товар"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Ccылка на товар")}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-wrap-add">
            <input
              type="number"
              name="amount"
              placeholder="Количество"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Количество")}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-wrap-add">
            <input
              type="text"
              placeholder="Пожелания"
              name="description"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Пожелания")}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <BottomBtn btnTitle="Добавить" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default addToCart;
