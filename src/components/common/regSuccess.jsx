import React from "react";
import successImg from "../../img/success.svg";
import SecondaryBtn from "./secondaryBtn";

const RegSuccess = () => {
  return (
    <div
      className="main-wrap page success-page container"
      style={{ paddingTop: "0" }}
    >
      <img src={successImg} alt="#" />
      <h2>Регистрация прошла успешно!</h2>
      <SecondaryBtn
        style={{ marginTop: "10px", backgroundColor: "#007eff" }}
        linkTo="/home"
        btnTitle="На главную"
        iconClass="fas fa-home"
      />
    </div>
  );
};

export default RegSuccess;
