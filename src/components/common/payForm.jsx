import React, { Component } from "react";
import TopLine from "./topline";
import { Redirect } from "react-router-dom";
import BottomBtn from "./bottomBtn";

class PayForm extends Component {
  state = {
    amount: 0,
    backLink: "",
    redirectback: false,
    doUnmount: false,
    style: {
      position: "relative",
      bottom: "10px"
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
        <TopLine
          pageTitle="Пополнение баланса"
          handleBack={this.goBackCustom}
        />
        <div className="container">
          <input
            type="number"
            className="pay-input"
            placeholder="Введите сумму в UAH"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Введите сумму в UAH")}
          />
        </div>
        <BottomBtn btnTitle="Оплатить" styles={this.state.style} />
      </div>
    );
  }
}

export default PayForm;
