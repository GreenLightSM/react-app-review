import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./components/home";
import Logistic from "./components/logistic";
import Communications from "./components/communications";
import Finance from "./components/finance";
import Avia from "./components/avia";
import cart from "./components/cart";
import addToCart from "./components/common/addToCart";
import Edit from "./components/common/edit";
import PayForm from "./components/common/payForm";
import Login from "./components/login";
import Profile from "./components/profile";
import cartSuccess from "./components/common/cartSuccess";
import Coure from "./components/coure";
import singleNotif from "./components/common/singleNotif";
import Sea from "./components/sea";
import Truck from "./components/truck";
import Train from "./components/train";
import Addresses from "./components/addresses";
import Contacts from "./components/contact";
import StepFirst from "./components/common/sterFirst";
import StepSecond from "./components/common/stepSecond";
import StepThird from "./components/common/stepThird";
import RegSuccess from "./components/common/regSuccess";
import StepFirstPass from "./components/common/stepFirstPass";
import StepSecondPass from "./components/common/stepSecondPass";
import StepThirdPass from "./components/common/stepThirdPass";
import SingleItem from "./components/common/singleItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import NavBar from "./components/common/navbar";
import AddReceiver from "./components/common/addReceiver";
import EditReceiver from "./components/common/editReceiver";
import SingleItemBuy from "./components/common/singleItemBuy";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      //Get initial depth of current page
      prevDepth: this.getPathDepth(this.props.location)
    };
  }

  showMenu = (location) => {
    if (
      this.props.location.pathname.split("/")[1] === "" ||
      this.props.location.pathname.split("/")[1] === "login" ||
      this.props.location.pathname.split("/")[1] === "step1" ||
      this.props.location.pathname.split("/")[1] === "step2" ||
      this.props.location.pathname.split("/")[1] === "step3" ||
      this.props.location.pathname.split("/")[1] === "step1Pass" ||
      this.props.location.pathname.split("/")[1] === "step2Pass" ||
      this.props.location.pathname.split("/")[1] === "step3Pass"
    ) {
      return;
    } else {
      return <NavBar />;
    }
  };

  getPathDepth(location) {
    let pathArr = location.pathname.split("/");
    pathArr = pathArr.filter((n) => n !== "");
    return pathArr.length;
  }

  render() {
    const { location } = this.props;
    const currentKey = location.pathname.split("/")[1] || "/";
    const timeout = { enter: 200, exit: 400 };

    return (
      <React.Fragment>
        <TransitionGroup component="div" className="App">
          <CSSTransition
            key={currentKey}
            timeout={timeout}
            classNames="pageSlider"
            mountOnEnter={false}
            unmountOnExit={true}
          >
            <div
              className={
                this.getPathDepth(location) - this.state.prevDepth >= 0
                  ? "left"
                  : "right"
              }
            >
              <Switch location={location}>
                <Route path="/" component={Login} exact />
                <Route path="/home" component={Home} />
                <Route path="/logistic" component={Logistic} />
                <Route path="/communications" component={Communications} />
                <Route path="/finance" component={Finance} />
                <Route path="/avia" component={Avia} />
                <Route path="/cart" component={cart} />
                <Route path="/addToCart" component={addToCart} />
                <Route path="/edit" component={Edit} />
                <Route path="/payForm" component={PayForm} />
                <Route path="/profile" component={Profile} />
                <Route path="/successcart" component={cartSuccess} />
                <Route path="/coure" component={Coure} />
                <Route path="/singleNotif" component={singleNotif} />
                <Route path="/sea" component={Sea} />
                <Route path="/truck" component={Truck} />
                <Route path="/train" component={Train} />
                <Route path="/addresses" component={Addresses} />
                <Route path="/contact" component={Contacts} />
                <Route path="/step1" component={StepFirst} />
                <Route path="/step2" component={StepSecond} />
                <Route path="/step3" component={StepThird} />
                <Route path="/successReg" component={RegSuccess} />
                <Route path="/step1Pass" component={StepFirstPass} />
                <Route path="/step2Pass" component={StepSecondPass} />
                <Route path="/step3Pass" component={StepThirdPass} />
                <Route path="/singleItem" component={SingleItem} />
                <Route path="/addReceiver" component={AddReceiver} />
                <Route path="/editReceiver" component={EditReceiver} />
                <Route path="/singleItemBuy" component={SingleItemBuy} />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
        {this.showMenu()}
      </React.Fragment>
    );
  }
}

export default withRouter(App);
