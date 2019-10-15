import React, { Component } from "react";
import file from "../../img/file.png";
import fileSend from "../../img/file-send.png";

class HelperBottom extends Component {
  state = {};
  render() {
    return (
      <div className="helper-bottom">
        <div className="helper-file">
          <img src={file} alt="#" />
        </div>
        <input type="text" />
        <button>
          <img src={fileSend} alt="#" />
        </button>
      </div>
    );
  }
}

export default HelperBottom;
