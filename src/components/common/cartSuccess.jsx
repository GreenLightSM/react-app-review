import React from "react";
import successImg from "../../img/success.svg";
import SecondaryBtn from "./secondaryBtn";

const cartSuccess = () => {
  return (
    <div
      className="main-wrap page success-page container"
      style={{ paddingTop: "0" }}
    >
      <img src={successImg} alt="#" />
      <h2>Ваш заказ отправлен в обработку</h2>
      <SecondaryBtn
        style={{ marginTop: "30px" }}
        linkTo="/cart"
        btnTitle="Назад"
        iconClass="fas fa-long-arrow-alt-left"
      />
      <SecondaryBtn
        style={{ marginTop: "10px", backgroundColor: "#007eff" }}
        linkTo="/home"
        btnTitle="На главную"
        iconClass="fas fa-home"
      />
    </div>
  );
};

export default cartSuccess;
