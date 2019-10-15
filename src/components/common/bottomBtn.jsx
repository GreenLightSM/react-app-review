import React from "react";

const BottomBtn = props => {
  return (
    <React.Fragment>
      <button
        className="bottomBtn"
        style={props.styles}
        onClick={props.onClick}
      >
        {props.btnTitle}
      </button>
    </React.Fragment>
  );
};

export default BottomBtn;
