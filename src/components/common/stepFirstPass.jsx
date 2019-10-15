import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import InputMask from "react-input-mask";
import SecondaryBtn from "./secondaryBtn";
import closeImg from "../../img/cancel-music.png";

class StepFirstPass extends Component {
  state = {
    redirect: false,
    phone: "",
    display: "none"
  };

  handleChange = e => {
    this.setState({ phone: "+38 " + e.target.value });
  };

  handleSubmit = e => {
    let formData = new FormData();
    formData.append("phone", this.state.phone);
    formData.append("type", 1);

    fetch("https://dev.crm.inta.group/app/forgoutpassword", {
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
          if (this.state.phone.length === 19) {
            sessionStorage.setItem("phone", this.state.phone);
            this.setState({ redirect: true });
          }
        }
      })
      .catch(err => console.log(err));

    e.preventDefault();
  };

  render() {
    if (this.state.redirect) return <Redirect to="/step2Pass" />;
    return (
      <div className="main-wrap page container" style={{ paddingTop: "45px" }}>
        <div
          className="wrong-pass-popup"
          style={{ display: this.state.display }}
        >
          Ошибка
        </div>
        <div className="close">
          <Link to="/">
            <img src={closeImg} alt="#" />
          </Link>
        </div>
        <div className="number-form">
          <div className="num-input">
            <div>+380</div>
            <InputMask
              mask="\(099\) 999 99 99"
              maskChar={null}
              type="tel"
              onChange={this.handleChange}
              placeholder="номер телефона"
              style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
            />
          </div>
          <SecondaryBtn btnTitle="Далее" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default StepFirstPass;
