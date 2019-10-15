import React, { Component } from "react";
import TopLine from "./common/topline";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import BottomBtn from "./common/bottomBtn";

class Contacts extends Component {
  state = {
    redirectback: false,
    backLink: "",
    doUnmount: false,
    item: {
      name: "",
      last_name: "",
      email: "",
      country_id: "",
      city_id: "",
      type_delivery: 0
    },
    popupText: "",
    display: "none",
    counties: [],
    cities: [],
    currCountry: 1,
    client: [],
    avaRef: React.createRef(),
    selectStyle: {
      option: (provided, state) => ({
        ...provided,
        height: 50
      }),
      control: () => ({
        height: 50,
        display: "flex",
        borderBottom: "1px solid #bbb"
      })
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

  componentDidMount() {
    if (!sessionStorage.getItem("link")) {
      sessionStorage.setItem("link", "");
    }

    let formData2 = new FormData();
    formData2.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData2.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );

    fetch("https://dev.crm.inta.group/app/userinfo", {
      method: "POST",
      body: formData2
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.stringify(data.error)) {
          console.log("error");
        } else {
          this.setState({ client: data });
          this.getCity(this.state.client.country_id);
        }
      })
      .catch((err) => console.log(err));

    let formData = new FormData();
    formData.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );

    fetch("https://dev.crm.inta.group/app/country", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.stringify(data.error)) {
          console.log("error");
        } else {
          this.setState({
            counties: data.map((country) => {
              return {
                value: country.name_ru,
                label: country.name_ru,
                id: country.id
              };
            })
          });
        }
      })
      .catch((err) => console.log(err));

    ///////////////////////////////////////////
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

  getCity = (e) => {
    let formData1 = new FormData();
    formData1.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData1.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );

    formData1.append("country_id", e);

    fetch("https://dev.crm.inta.group/app/city", {
      method: "POST",
      body: formData1
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.stringify(data.error)) {
          console.log("error");
        } else {
          this.setState({
            cities: data.map((city) => {
              return { value: city.name_ru, label: city.name_ru, id: city.id };
            })
          });
        }
      })
      .catch((err) => console.log(err));
  };

  handleChange = ({ currentTarget: input }) => {
    const item = { ...this.state.item };
    item[input.name] = input.value;
    this.setState({ item });

    if (input.id === "country") {
      this.getCity(input.value);
    }
  };

  handleSubmit = () => {
    // -----------

    let formData = new FormData();
    formData.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );
    formData.append("first_name", this.state.item.name);
    formData.append("last_name", this.state.item.last_name);
    formData.append("email", this.state.item.email);
    formData.append("type_delivery", this.state.item.type_delivery);
    formData.append("country_id", this.state.item.country_id);
    formData.append("city_id", this.state.item.city_id);
    formData.append("avatar", this.state.avaRef.current.value);

    fetch("https://dev.crm.inta.group/app/userinfoedit", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.stringify(data.error)) {
          this.setState({ display: "block", popupText: "Ошибка" });
          setTimeout(() => {
            this.setState({ display: "none" });
          }, 2000);
        } else {
          this.setState({
            display: "block",
            popupText: "Профиль успешно отредактиорван"
          });
          setTimeout(() => {
            this.setState({ display: "none" });
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  handleChangeSelect = (item, name) => {
    if (name === "city_id") {
      const city = { ...this.state.item };
      city["city_id"] = item.id;
      this.setState({ item: city });
    } else if (name === "country_id") {
      const country = { ...this.state.item };
      country["country_id"] = item.id;
      this.setState({ item: country });
    }
  };

  render() {
    if (this.state.redirectback) {
      return <Redirect to={this.state.backLink} />;
    }

    return (
      <div className="main-wrap page">
        <TopLine
          pageTitle="Контактная информация"
          handleBack={this.goBackCustom}
        />
        <div
          className="wrong-pass-popup"
          style={{ display: this.state.display }}
        >
          {this.state.popupText}
        </div>
        <div className="cart-item-wrap container">
          <div className="pf-form">
            <label htmlFor="sum">Имя:</label>
            <input
              type="text"
              defaultValue={this.state.client.first_name}
              onChange={this.handleChange}
              name="name"
            />

            <label htmlFor="sum">Фамилия:</label>
            <input
              type="text"
              defaultValue={this.state.client.last_name}
              onChange={this.handleChange}
              name="last_name"
            />

            <label htmlFor="sum">E-mail:</label>
            <input
              type="text"
              defaultValue={this.state.client.email}
              onChange={this.handleChange}
              name="email"
            />

            <input type="hidden" id="ava" ref={this.state.avaRef} />

            <label htmlFor="sum">Выберете страну</label>
            <Select
              options={this.state.counties}
              styles={this.state.selectStyle}
              onChange={(item) => this.handleChangeSelect(item, "country_id")}
              menuShouldScrollIntoView
            />

            <label htmlFor="sum">Выберете город</label>
            <Select
              options={this.state.cities}
              styles={this.state.selectStyle}
              onChange={(item) => this.handleChangeSelect(item, "city_id")}
              menuShouldScrollIntoView
            />
          </div>
        </div>
        <BottomBtn btnTitle="Сохранить" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default Contacts;
