import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import HassAcc from "./hasAcc";
import SecondaryBtn from "./secondaryBtn";

class StepSecond extends Component {
  state = {
    redirect: false,
    code: "",
    display: "none"
  };

  handleChange = e => {
    this.setState({ code: e.target.value });
  };

  handleSubmit = e => {
    let formData = new FormData();
    formData.append("phone", sessionStorage.getItem("phone"));
    formData.append("type", 2);
    formData.append("code", this.state.code);

    fetch("https://dev.crm.inta.group/app/registration", {
      method: "POST",
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (JSON.stringify(data.error)) {
          this.setState({ display: "block" });
          setTimeout(() => {
            this.setState({ display: "none" });
          }, 2000);
        } else {
          sessionStorage.setItem("code", this.state.code);
          this.setState({ redirect: true });
        }
      })
      .catch(err => console.log(err));

    e.preventDefault();
  };

  render() {
    if (this.state.redirect) return <Redirect to="/step3" />;
    return (
      <div className="main-wrap page">
        <div
          className="wrong-pass-popup"
          style={{ display: this.state.display }}
        >
          Неверный код
        </div>
        <div className="close sec">
          <Link to="/" />
        </div>

        <div className="step2-text container" style={{ paddingTop: "15px" }}>
          <div className="type-code">
            Введите код, который мы
            <br /> отправили на номер
            <br /> {sessionStorage.getItem("phone")}
          </div>
          <div className="sms">
            <a href="#">Отправить SMS ещё раз</a>
            <br />
            <span>или</span>
            <br />
            <Link to="/step1">Изменить номер телефона</Link>
            <br />
          </div>
          <div className="number-form number-form-step2">
            <div className="num-input">
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Код подтверждения"
              />
            </div>
            <SecondaryBtn
              btnTitle="Далее"
              onClick={this.handleSubmit}
              style={{ marginTop: "15px" }}
            />
          </div>
        </div>
        <HassAcc />
      </div>
    );
  }
}

export default StepSecond;
