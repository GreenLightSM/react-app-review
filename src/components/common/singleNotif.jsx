import React, { Component } from "react";
import TopLine from "./topline";
import { Redirect } from "react-router-dom";

class singleNotif extends Component {
  state = {
    backLink: "",
    redirectback: false,
    doUnmount: false
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
        <TopLine pageTitle="Уведомления" handleBack={this.goBackCustom} />
        <div
          className="finance-history-wrap container"
          style={{ marginTop: "0", height: "calc(100vh - 120px)" }}
        >
          <div className="fh-item">
            <div className="fhi-content" style={{ paddingLeft: "0" }}>
              <div className="fhi-title">
                Транзакции за вашим балансом{" "}
                <span style={{ textAlign: "right" }}>
                  24.08.2019 <span style={{ color: "grey" }}>17:21</span>
                </span>
              </div>
              <div
                className="fhi-title"
                style={{ color: "grey", marginTop: "10px", fontSize: "12px" }}
              >
                29,17 USD перевод средств. ID платежа 372751
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default singleNotif;
