import React, { Component } from "react";
import logo from "../img/logo.svg";
import { Link, Redirect } from "react-router-dom";
import InputMask from "react-input-mask";

class Login extends Component {
  state = {
    account: {
      phone: "",
      password: ""
    },
    display: "none",
    sendRef: React.createRef(),
    hintRef: React.createRef(),
    sendStyle: {},
    hintStyle: {}
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });

    if (input.name === "password") {
      if (input.value.length < 6) {
        input.style.borderBottom = "1px solid red";
        this.setState({ sendStyle: { marginTop: "20px" } });
        this.setState({ hintStyle: { display: "block" } });
      } else {
        input.style.borderBottom = "1px solid #2fcca6";
        this.setState({ sendStyle: { marginTop: "0" } });
        this.setState({ hintStyle: { display: "none" } });
      }
    }
  };

  handleSubmit = (e) => {
    if (this.state.account.password.length >= 6) {
      let formData = new FormData();
      formData.append("phone", this.state.account.phone);
      formData.append("password", this.state.account.password);

      fetch("https://dev.crm.inta.group/app/auth", {
        method: "POST",
        body: formData
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (JSON.stringify(data.error)) {
            this.setState({ display: "block" });
            setTimeout(() => {
              this.setState({ display: "none" });
            }, 2000);
          } else {
            localStorage.setItem("token", JSON.stringify(data.user.token));
            localStorage.setItem("tokenID", JSON.stringify(data.user.token_id));
            localStorage.setItem(
              "client_id",
              JSON.stringify(data.user.client_id)
            );

            this.setState({ redirect: true });
          }
        })
        .catch((err) => console.log(err));
    }

    e.preventDefault();
  };

  render() {
    if (this.state.redirect) return <Redirect to="/home" />;
    if (localStorage.getItem("token") && localStorage.getItem("tokenID"))
      return <Redirect to="/home" />;
    return (
      <div className="main-wrap page login" id="login">
        <div
          className="wrong-pass-popup"
          style={{ display: this.state.display }}
        >
          Неверный логин или пароль
        </div>
        <div className="login-logo">
          <img src={logo} alt="#" />
        </div>
        <div className="home-title">
          Логистика 21 века
          <br />в вашем смартфоне
        </div>
        <div className="home-undertitle">
          Логистическая компания полного цикла.
          <br />
          Доставка и выкуп товаров <br />
          со всего мира!
        </div>
        <form
          action="#"
          className="login-form container"
          style={{ paddingTop: "30px" }}
          onSubmit={this.handleSubmit}
        >
          <InputMask
            mask="+3\8 \(099\) 999 99 99"
            maskChar={null}
            type="tel"
            name="phone"
            placeholder="Введите номер телефона"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Введите номер телефона")}
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="Введите пароль"
            name="password"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Введите пароль")}
            onChange={this.handleChange}
          />
          <div className="pass-hint" ref={this.state.hintRef}>
            Пароль должен содержать минимум 6 символов
          </div>
          <input
            type="submit"
            id="send"
            ref={this.state.sendRef}
            value="Войти"
            style={this.state.sendStyle}
          />
          <Link to="/step1Pass">Забыли пароль?</Link>
        </form>
        <Link to="/step1" className="register-btn">
          Регистрация
        </Link>
      </div>
    );
  }
}

export default Login;
