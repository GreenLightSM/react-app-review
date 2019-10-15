import React from "react";
import { Link } from "react-router-dom";

const Search = (props) => {
  return (
    <div className="search">
      <div className="search-input-wrap">
        <i className="fas fa-search" />
        <input type="text" placeholder="Поиск" />
      </div>
      <Link to="#" onClick={props.onClick}>
        <i className="fas fa-sliders-h" style={{ fontSize: "18px" }} />
      </Link>
    </div>
  );
};

export default Search;
