import React from "react";

const Switchers = (props) => {
  return (
    <React.Fragment>
      <div className="delivery-check">
        <div className="dc-left">{props.firstTitle} </div>
        <div className="dc-right">
          <input type="checkbox" id="check" onChange={props.handleChange} />
          <div className="dc-btn-wrap">
            <div />
            <div />
          </div>
        </div>
      </div>
      <div className="delivery-check" style={props.hideStyle}>
        <div className="dc-left">Хрупкий груз</div>
        <div className="dc-right">
          <input type="checkbox" id="pack" onChange={props.handleChange} />
          <div className="dc-btn-wrap">
            <div />
            <div />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Switchers;
