import React, { Component } from "react";
import LogisticBuybackItem from "./logisticBuybackItem";
import preloader from "../../img/833.gif";
import AddBtn from "./addBtn";
import Filter from "./filter";

class LogisticBuyback extends Component {
  state = {
    trackList: [],
    fetching: true
  };

  showPreloader = (e) => {
    if (this.state.fetching) {
      return <img src={preloader} alt="#" />;
    }
  };

  componentDidMount() {
    let formData = new FormData();
    formData.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );

    fetch("https://dev.crm.inta.group/app/orders", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ trackList: data.orders, fetching: false });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className="preloader">{this.showPreloader()}</div>
        {this.state.trackList ? (
          this.state.trackList.map((item) => {
            return <LogisticBuybackItem item={item} key={item.order_id} />;
          })
        ) : (
          <h2>У Вас пока нет выкупов</h2>
        )}
      </React.Fragment>
    );
  }
}

export default LogisticBuyback;
