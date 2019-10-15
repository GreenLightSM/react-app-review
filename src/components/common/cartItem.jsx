import React, { Component } from "react";
import editImg from "../../img/edit.svg";
import deleteImg from "../../img/bin.svg";
import { Link } from "react-router-dom";
import camera from "../../img/camera.png";

class CartItem extends Component {
  state = {
    refresh: 0,
    display: "none",
    btnDisplay: "block",
    popupText: "Товар успешно удалён",
    currItem: "",
    showIcons: this.props.hideIcons ? { display: "none" } : { display: "flex" },
    showImg: this.props.showImg ? { display: "block" } : { display: "none" },
    marginLeft: this.props.showImg
      ? { marginLeft: "15px" }
      : { marginLeft: "0", width: "100%" }
  };
  showPopup = (e) => {
    sessionStorage.setItem("order_id", e.target.id);
    let currItem = e.target.parentNode.parentNode.parentNode.parentNode;

    this.setState({ display: "block", currItem: currItem });
  };

  setItemSessionID = (e) => {
    sessionStorage.setItem("order_id", e.target.id);
  };

  hidePopup = (e) => {
    this.setState({ display: "none" });
  };

  deleteItem = (e) => {
    let formData = new FormData();
    formData.append(
      "token",
      localStorage.getItem("token").replace(/[^\w\s]/gi, "")
    );
    formData.append(
      "token_id",
      localStorage.getItem("tokenID").replace(/[^\w\s]/gi, "")
    );
    formData.append("order_id", sessionStorage.getItem("order_id"));

    fetch("https://dev.crm.inta.group/app/deleteorder", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.stringify(data.error)) {
          this.setState({
            popupText: "Ошибка удаления!",
            btnDisplay: "none"
          });
        } else {
          this.state.currItem.remove();
          this.setState({ resultDisplay: "block" });
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { order_id, title, link, amount, description } = this.props.item;
    return (
      <div className="cart-item">
        <div
          className="wrong-pass-popup"
          style={{ display: this.state.display }}
        >
          Вы действительно хотите удалить товар?
          <div className="popup-btns">
            <div className="popup-btn" onClick={this.deleteItem}>
              Ок
            </div>
            <div
              className="popup-btn"
              style={{ backgroundColor: "#FF1E1E" }}
              onClick={this.hidePopup}
            >
              Cancel
            </div>
          </div>
        </div>
        <div className="cart-item-wrap-flex">
          <div className="delivery-image" style={this.state.showImg}>
            <img
              src={require("../../img/delivery-item.jpg")}
              alt="#"
              style={{ width: "100%" }}
              onClick={this.props.handleImg}
            />
          </div>
          <div className="cart-item-right" style={this.state.marginLeft}>
            <div className="ci-title">
              {title}{" "}
              <span style={this.state.showIcons}>
                <Link to="/edit">
                  <img
                    src={editImg}
                    id={order_id}
                    onClick={this.setItemSessionID}
                    alt="#"
                  />
                </Link>
                <Link to="#">
                  <img
                    src={deleteImg}
                    id={order_id}
                    alt="#"
                    onClick={this.showPopup}
                  />
                </Link>
              </span>
            </div>
            <div className="ci-link">{link}</div>
            <div className="ci-amount">{amount} шт.</div>
            <div className="ci-desc">{description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
