import React from "react";

const Count = props => {
  return (
    <React.Fragment>
      <div className="home-count">
        <div className="hc-title">{props.title}</div>
        <div className="hc-wrap">
          <div className="hc-item">
            <div className="hci-icon">
              <img src={props.img1} alt="#" />
            </div>
            <div className="hci-title">{props.title1}</div>
            <div className="hci-number">0</div>
          </div>
          <div className="hc-item">
            <div className="hci-icon">
              <img src={props.img2} alt="#" />
            </div>
            <div className="hci-title">{props.title2}</div>
            <div className="hci-number">0</div>
          </div>
          <div className="hc-item">
            <div className="hci-icon">
              <img src={props.img3} alt="#" />
            </div>
            <div className="hci-title">{props.title3}</div>
            <div className="hci-number">0</div>
          </div>
          <div className="hc-item" style={props.style}>
            <div className="hci-icon">
              <img src={props.img4} alt="#" />
            </div>
            <div className="hci-title">{props.title4}</div>
            <div className="hci-number">0</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Count;
