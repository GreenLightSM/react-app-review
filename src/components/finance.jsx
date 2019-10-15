import React, { Component } from "react";
import TopLine from "../components/common/topline";
import { Redirect } from "react-router-dom";
import arrowRed from "../img/arrow-red.png";
import arrowGreen from "../img/arrow-green.png";
import SecondaryBtn from "./common/secondaryBtn";

class Finance extends Component {
  state = {
    backLink: "",
    redirectback: false,
    doUnmount: false,
    operationsHistory: [],
    balance: 0,
    popupStyle: {},
    overlayStyle: {}
  };

  closePopup = (e) => {
    if (e.target.id !== "payPopup" && e.target.id !== "payBtn") {
      this.setState({
        popupStyle: {
          zIndex: "-1",
          opacity: "0",
          transform: "scale(.8) translateY(-50%)"
        },
        overlayStyle: { display: "none" }
      });
    }
  };

  showPopup = () => {
    this.setState({
      popupStyle: {
        zIndex: "15",
        opacity: "1",
        transform: "scale(1) translateY(-50%)"
      },
      overlayStyle: { display: "block" }
    });
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
          operationsHistory: data.payments,
          balance: data.balance
        });
        console.log(this.state.operationsHistory);
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
    return (
      <div className="main-wrap page">
        <div
          className="overlay"
          onClick={this.closePopup}
          style={this.state.overlayStyle}
        />
        <div className="payPopup" id="payPopup" style={this.state.popupStyle}>
          <span>Введите сумму:</span>
          <input type="number" placeholder="0" />
          <SecondaryBtn btnTitle="Пополнить" style={{ marginTop: "15px" }} />
        </div>
        <TopLine pageTitle="Финансы" handleBack={this.goBackCustom} />
        <div className="container">
          <div className="finance-info-wrap">
            <div className="available-money">
              <span
                style={{
                  fontWeight: "normal",
                  color: "grey",
                  fontSize: "14px"
                }}
              >
                Доступно:
              </span>
              <br />
              <span>{this.state.balance} $</span>
            </div>
            <div className="f-btn" onClick={this.showPopup} id="payBtn">
              <i className="fas fa-plus" />
              <div>
                Пополнить
                <br /> баланс
              </div>
            </div>
          </div>
          <div className="finance-history-wrap">
            {this.state.operationsHistory ? (
              this.state.operationsHistory.map((item) => (
                <div className="fh-item" key={item.payment_id}>
                  <div className="fhi-img">
                    <img
                      src={item.type === 1 ? arrowGreen : arrowRed}
                      alt="#"
                    />
                  </div>
                  <div className="fhi-content">
                    <div className="fhi-title">
                      Транзакции за вашим балансом{" "}
                      <span style={{ textAlign: "right" }}>
                        {item.date} <span style={{ color: "grey" }}>17:21</span>
                      </span>
                    </div>
                    <div
                      className="fhi-title"
                      style={{
                        color: "grey",
                        marginTop: "10px",
                        fontSize: "12px"
                      }}
                    >
                      {item.type === 1 ? "+" : "-"} {item.summ}{" "}
                      {item.description}. ID платежа {item.payment_id}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>История пуста</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Finance;
