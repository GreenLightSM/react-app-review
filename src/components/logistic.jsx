import React, { Component } from "react";
import TopLine from "../components/common/topline";
import { Redirect } from "react-router-dom";
import MiniMenu from "./common/minimenu";
import LogisticDelivery from "./common/logisticDelivery";
import LogisticBuyback from "./common/logisticBuyback";
import LogisticReceivers from "./common/logisticReceiver";
import Search from "./common/search";
import Filter from "./common/filter";
import AddBtn from "./common/addBtn";

class Logistic extends Component {
  state = {
    backLink: "",
    redirectback: false,
    doUnmount: false,
    delivery: true,
    buyback: false,
    receiver: false,
    goodsList: [],
    trackList: [],
    addBtnLink: "/avia",
    filterRef: React.createRef()
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

  handleTab = (e) => {
    let nodes = e.target.parentNode.parentNode.childNodes;

    for (let i = 0; i <= nodes.length - 1; i++) {
      nodes[i].firstChild.style.color = "#000";
    }

    e.target.style.color = "#fff";

    if (e.target.parentNode.id === "delivery") {
      this.setState({ delivery: true, buyback: false, receiver: false });
      this.setState({ addBtnLink: "/avia" });
    } else if (e.target.parentNode.id === "buyback") {
      this.setState({ delivery: false, buyback: true, receiver: false });
      this.setState({ addBtnLink: "/addToCart" });
    } else if (e.target.parentNode.id === "receiver") {
      this.setState({ delivery: false, buyback: false, receiver: true });
      this.setState({ addBtnLink: "/addReceiver" });
    }
  };

  showTab = () => {
    if (this.state.delivery) {
      return <LogisticDelivery />;
    } else if (this.state.buyback) {
      return <LogisticBuyback />;
    } else if (this.state.receiver) {
      return <LogisticReceivers />;
    }
  };

  showFilter = (e) => {
    this.setState({ filterStyle: { transform: "translateY(0)" } });
    this.setState({ overlayStyle: { display: "block" } });
  };

  closeFilter = (e) => {
    this.setState({
      filterStyle: { transform: "translateY(calc(100% + 40px))" }
    });
    this.setState({ overlayStyle: { display: "none" } });
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
        <div
          className="overlay"
          onClick={this.closeFilter}
          style={this.state.overlayStyle}
        />
        <TopLine pageTitle="Логистика" handleBack={this.goBackCustom} />
        <div className="logistic-wrap container">
          <MiniMenu onClick={this.handleTab} />
          <Search onClick={this.showFilter} />
          <div className="logistic-content">{this.showTab()}</div>
        </div>
        <Filter handleClose={this.closeFilter} style={this.state.filterStyle} />
        <AddBtn linkTo={this.state.addBtnLink} />
      </div>
    );
  }
}

export default Logistic;
