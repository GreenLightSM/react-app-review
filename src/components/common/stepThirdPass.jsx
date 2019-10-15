import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import SecondaryBtn from "./secondaryBtn";
import closeImg from "../../img/cancel-music.png";

class StepThirdPass extends Component {
  state = {
    redirect: false,
    data: {
      pass: "",
      repPass: ""
    },
    display: "none",
    styleBtn: {},
    sendRef: React.createRef(),
    hintRef: React.createRef(),
    sendStyle: {},
    sentStyle2: {},
    hintStyle: {}
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });

    if (input.name === "pass") {
      if (input.value.length < 6) {
        input.style.border = "1px solid red";
        this.setState({ sendStyle: { marginTop: "20px" } });
        this.setState({ hintStyle: { display: "block", color: "red" } });
      } else {
        input.style.border = "1px solid #2fcca6";
        this.setState({ sendStyle: { marginTop: "0" } });
        this.setState({ hintStyle: { display: "none" } });
      }
    }

    if (input.name === "repPass") {
      if (input.value !== this.state.data.pass) {
        input.style.border = "1px solid red";
        this.setState({ styleBtn: { marginTop: "30px" } });
        this.setState({ sendStyle2: { display: "block", color: "red" } });
      } else {
        input.style.border = "1px solid #2fcca6";
        this.setState({ styleBtn: { marginTop: "0px" } });
        this.setState({ sendStyle2: { display: "none" } });
      }
    }
  };

  handleSubmit = (e) => {
    if (this.state.data.pass.length >= 6) {
      let formData = new FormData();
      formData.append("phone", sessionStorage.getItem("phone"));
      formData.append("type", 3);
      formData.append("code", sessionStorage.getItem("code"));
      formData.append("password", this.state.data.pass);
      formData.append("confirm_password", this.state.data.repPass);

      fetch("https://dev.crm.inta.group/app/forgoutpassword", {
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
            localStorage.setItem("tokenID", data.user.token_id);
            localStorage.setItem("token", data.user.token);
            localStorage.setItem("client_id", data.user.client_id);
            this.setState({ display: "block" });
            setTimeout(() => {
              this.setState({ redirect: true });
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        hintStyle: { display: "block", color: "red", transform: "scale(1.1)" }
      });
      setTimeout(() => {
        this.setState({
          hintStyle: { display: "block", color: "red", transform: "scale(1)" }
        });
      }, 100);
    }

    e.preventDefault();
  };

  render() {
    if (this.state.redirect) return <Redirect to="/home" />;
    return (
      <div className="main-wrap page container" style={{ paddingTop: "50px" }}>
        <div
          className="wrong-pass-popup"
          style={{ display: this.state.display }}
        >
          Пароль успешно изменён
        </div>
        <div className="close">
          <Link to="/">
            <img src={closeImg} alt="#" />
          </Link>
        </div>

        <div className="number-form number-form-step3">
          <div className="inputs-title">Пароль:</div>
          <div className="num-input">
            <input
              type="password"
              name="pass"
              onChange={this.handleChange}
              placeholder="Пароль"
              ref={this.state.sendRef}
            />
          </div>
          <div className="pass-hint" style={this.state.hintStyle}>
            Пароль должен содержать минимум 6 символов
          </div>
          <div className="num-input">
            <input
              type="password"
              name="repPass"
              onChange={this.handleChange}
              placeholder="Подтверждение пароля"
              id="send"
            />
          </div>
          <div className="pass-hint pass-hint-2" style={this.state.sendStyle2}>
            Пароли не совпадают
          </div>
          <SecondaryBtn
            btnTitle="Изменить"
            onClick={this.handleSubmit}
            style={this.state.styleBtn}
          />
        </div>
      </div>
    );
  }
}

export default StepThirdPass;
