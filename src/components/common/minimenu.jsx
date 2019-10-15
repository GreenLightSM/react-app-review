import React from "react";

const MiniMenu = props => {
  return (
    <div className="mini-menu">
      <div className="mini-menu-selected" />
      <ul>
        <li id="delivery" onClick={props.onClick}>
          <span>Доставка</span>
        </li>
        <li id="buyback" onClick={props.onClick}>
          <span>Выкуп товаров</span>
        </li>
        <li id="receiver" onClick={props.onClick}>
          <span>Получатели</span>
        </li>
      </ul>
    </div>
  );
};

export default MiniMenu;
