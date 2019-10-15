import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import HassAcc from "./hasAcc";
import SecondaryBtn from "./secondaryBtn";

class StepThird extends Component {
  state = {
    redirect: false,
    data: {
      fio: "",
      email: "",
      city: "",
      address: "",
      pass: "",
      repPass: "",
      patronymic: "",
      lastname: ""
    },
    display: "none"
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = e => {
    let formData = new FormData();
    formData.append("phone", sessionStorage.getItem("phone"));
    formData.append("type", 3);
    formData.append("code", sessionStorage.getItem("code"));
    formData.append("name", this.state.data.fio);
    formData.append("email", this.state.data.email);
    formData.append("city", this.state.data.city);
    formData.append("password", this.state.data.pass);
    formData.append("confirm_password", this.state.data.repPass);
    formData.append("address", this.state.data.address);

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
          localStorage.setItem("tokenID", data.user.token_id);
          localStorage.setItem("token", data.user.token);
          localStorage.setItem("client_id", data.user.client_id);
          this.setState({ redirect: true });
        }
      })
      .catch(err => console.log(err));

    e.preventDefault();
  };

  render() {
    if (this.state.redirect) return <Redirect to="/successReg" />;
    return (
      <div className="main-wrap page">
        <div
          className="wrong-pass-popup"
          style={{ display: this.state.display }}
        >
          Ошибка
        </div>
        <div className="close sec">
          <Link to="/" />
        </div>

        <div
          className="number-form number-form-step3 container"
          style={{ paddingTop: "15px" }}
        >
          <div className="num-input">
            <input
              type="text"
              name="fio"
              value={this.state.data.fio}
              onChange={this.handleChange}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Имя")}
              placeholder="Имя"
            />
          </div>
          <div className="num-input">
            <input
              type="text"
              name="lastname"
              value={this.state.data.lastname}
              onChange={this.handleChange}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Фамилия")}
              placeholder="Фамилия"
            />
          </div>
          <div className="num-input">
            <input
              type="text"
              name="patronymic"
              value={this.state.data.patronymic}
              onChange={this.handleChange}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Отчество")}
              placeholder="Отчество"
            />
          </div>
          <div className="num-input">
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "E-mail")}
              placeholder="E-mail"
            />
          </div>
          <div className="inputs-title">Адрес доставки:</div>
          <div className="num-input">
            <input
              type="text"
              name="city"
              onChange={this.handleChange}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Город")}
              placeholder="Город"
            />
          </div>
          <div className="num-input">
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Адрес")}
              placeholder="Адрес"
            />
          </div>
          <div className="inputs-title">Пароль:</div>

          <div className="num-input">
            <input
              type="password"
              name="pass"
              onChange={this.handleChange}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Пароль")}
              placeholder="Пароль"
            />
          </div>
          <div className="num-input">
            <input
              type="password"
              name="repPass"
              onChange={this.handleChange}
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Подтверждение пароля")}
              placeholder="Подтверждение пароля"
            />
          </div>
          <SecondaryBtn btnTitle="Далее" onClick={this.handleSubmit} />
        </div>
        <HassAcc />
      </div>
    );
  }
}

export default StepThird;
