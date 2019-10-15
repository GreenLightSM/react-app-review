import React, { Component } from "react";
import TopLine from "./common/topline";
import { Redirect } from "react-router-dom";
import SecondaryBtn from "./common/secondaryBtn";

class Addresses extends Component {
  state = { redirectback: false, backLink: "", doUnmount: false };
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
      return;
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
    return (
      <div className="main-wrap page">
        <TopLine pageTitle="Адреса доставки" handleBack={this.goBackCustom} />
        <div className="addresses-wrap container">
          <div className="a-item">
            <div className="ai-title">
              Muryi Sasha <i className="fas fa-times" />
            </div>
            <div className="ai-phone">
              <i className="fas fa-phone" />
              +38(068)-77-123-00
            </div>
            <div className="ai-phone">Способ доставки</div>
            <div className="ai-phone">Улица Пушкина дом Клатушкина</div>
          </div>
          <SecondaryBtn
            btnTitle="Добавить адрес"
            iconClass="fas fa-plus"
            style={{ marginTop: "15px" }}
          />
        </div>
      </div>
    );
  }
}

export default Addresses;
