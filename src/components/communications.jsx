import React, { Component } from "react";
import TopLine from "../components/common/topline";
import dollar from "../img/dollar.png";
import car from "../img/com-car.png";
import buying from "../img/com-buying.png";
import logo from "../img/logo.png";
import { Link, Redirect } from "react-router-dom";

class Communications extends Component {
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
        <TopLine pageTitle="Коммуникации" handleBack={this.goBackCustom} />
        <div className="container com-items">
          <Link to="/singleNotif" className="com-item">
            <div className="com-img">
              <img src={dollar} alt="#" />
            </div>
            <div className="com-content">
              <div className="com-con-top">
                <div className="cct-name">Финансы</div>
                <div className="cct-time">9 мин. назад</div>
              </div>
              <div className="com-desc">
                Транзанкции за вашим балансом <div>2</div>
              </div>
              <div
                className="com-desc"
                style={{
                  marginTop: "5px",
                  color: "grey",
                  fontWeight: "normal"
                }}
              >
                29,17 USD перевод средств. ID платежа 372751
              </div>
            </div>
          </Link>
          <Link to="/singleNotif" className="com-item">
            <div className="com-img">
              <img src={car} alt="#" />
            </div>
            <div className="com-content">
              <div className="com-con-top">
                <div className="cct-name">Логистика</div>
                <div className="cct-time">12 мин. назад</div>
              </div>
              <div className="com-desc">
                Транзанкции за вашим балансом{" "}
                <div>
                  {" "}
                  <span>2</span>
                </div>
              </div>
              <div
                className="com-desc"
                style={{
                  marginTop: "5px",
                  color: "grey",
                  fontWeight: "normal"
                }}
              >
                29,17 USD перевод средств. ID платежа 372751
              </div>
            </div>
          </Link>
          <Link to="/singleNotif" className="com-item">
            <div className="com-img">
              <img src={buying} alt="#" />
            </div>
            <div className="com-content">
              <div className="com-con-top">
                <div className="cct-name">Выкуп товаров</div>
                <div className="cct-time">9 мин. назад</div>
              </div>
              <div className="com-desc">
                Транзанкции за вашим балансом <div>2</div>
              </div>
              <div
                className="com-desc"
                style={{
                  marginTop: "5px",
                  color: "grey",
                  fontWeight: "normal"
                }}
              >
                29,17 USD перевод средств. ID платежа 372751
              </div>
            </div>
          </Link>
          <Link to="/singleNotif" className="com-item">
            <div className="com-img" style={{ backgroundColor: "#2fcca6" }}>
              <img src={logo} alt="#" />
            </div>
            <div className="com-content">
              <div className="com-con-top">
                <div className="cct-name">Персональный менеджер</div>
                <div className="cct-time">9 мин. назад</div>
              </div>
              <div className="com-desc">
                Транзанкции за вашим балансом <div>2</div>
              </div>
              <div
                className="com-desc"
                style={{
                  marginTop: "5px",
                  color: "grey",
                  fontWeight: "normal"
                }}
              >
                29,17 USD перевод средств. ID платежа 372751
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Communications;
