import React from "react";
import camera from "../../img/camera.png";
import { Link } from "react-router-dom";
import china from "../../img/china.png";
import ua from "../../img/ua.png";
import plane from "../../img/airplane-shape.svg";

const LogisticDeliveryItem = (props) => {
  const { cargo_id, summ, status_name, date, order_id } = props.item;

  return (
    <Link to="/singleItem" className="delivery-item-wrap" id={order_id}>
      <div className="delivery-item">
        <div className="delivery-info-wrap">
          <div className="delivery-image">
            <img src={require("../../img/delivery-item.jpg")} alt="#" />
            <img src={camera} alt="#" />
          </div>
          <div className="buying-right">
            <div className="delivery-main-info">
              <div className="delivery-title">CC-{cargo_id}</div>
              <ul>
                <li style={{ color: "#bbb", marginTop: "-5px" }}>Battery</li>
                <li style={{ marginTop: "5px" }}>Вес: 3.5кг</li>
                <li style={{ marginTop: "-4px" }}>
                  Обьём: 0.005 м<sup>3</sup>
                </li>
                <li>Кол-во: 75</li>
              </ul>
            </div>

            <div className="delivery-price">
              <Link to="#">Подробнее</Link>
              <br />
              <span>{summ} USD</span>
            </div>
          </div>
        </div>
        <div className="delivery-date">
          <span>{date}</span>
          <span style={{ color: "#007fff", fontWeight: "bold" }}>
            {status_name}
          </span>
          <span>12.07.2019</span>
        </div>
        <div className="delivery-status">
          <img src={china} alt="#" />
          <div className="status-bar">
            <span>
              {" "}
              <img src={plane} alt="#" />{" "}
            </span>
          </div>
          <img src={ua} alt="#" />
        </div>
      </div>
    </Link>
  );
};

export default LogisticDeliveryItem;
