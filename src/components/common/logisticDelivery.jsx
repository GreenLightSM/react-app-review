import React, { Component } from "react";
import LogisticDeliveryItem from "./logisticDeliveryItem";
import preloader from "../../img/833.gif";

class logisticDelivery extends Component {
  state = {
    goodsList: [],
    liStyle: {},
    fetching: true
  };

  showLinks = (e) => {
    this.setState({
      liStyle: { transform: "translateX(0px)", opacity: "1", zIndex: "1" }
    });

    e.preventDefault();
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

    fetch("https://dev.crm.inta.group/app/cargos", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ goodsList: data.cargos, fetching: false });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="del-wrap">
        <div className="preloader">{this.showPreloader()}</div>
        {this.state.goodsList ? (
          this.state.goodsList.map((item) => {
            return <LogisticDeliveryItem key={item.order_id} item={item} />;
          })
        ) : (
          <h2>У Вас пока не доставок</h2>
        )}
      </div>
    );
  }
}

export default logisticDelivery;
