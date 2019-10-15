import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Filter extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    filterRef: React.createRef()
  };

  setStartDate = (date) => {
    this.setState({
      startDate: date
    });
  };

  setEndDate = (date) => {
    this.setState({
      endDate: date
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="filter-wrap" style={this.props.style}>
          <i
            className="far fa-times-circle filter-close"
            onClick={this.props.handleClose}
          ></i>
          <ul>
            <li style={{ backgroundColor: "#007FFF", color: "#fff" }}>
              <span>Фильтр</span> <button>Сбросить</button>
            </li>
            <li>
              Ожидается поступление <input type="checkbox" />{" "}
              <i className="fas fa-check" />
            </li>
            <li>
              Проблемные <input type="checkbox" />{" "}
              <i className="fas fa-check" />
            </li>
            <li>
              На доставке <input type="checkbox" />{" "}
              <i className="fas fa-check" />
            </li>
            <li>
              Доставленне <input type="checkbox" />{" "}
              <i className="fas fa-check" />
            </li>
            <li style={{ borderBottom: "0" }}>
              По дате <button style={{ color: "#007FFF" }}>Сбросить</button>
            </li>
            <li style={{ justifyContent: "flex-start", borderBottom: "0" }}>
              <span>
                от{" "}
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.setStartDate}
                  dateFormat="d/M/y"
                />
              </span>{" "}
              <span>
                до{" "}
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.setEndDate}
                  dateFormat="d/M/y"
                />
              </span>
            </li>
          </ul>
          <button className="filter-btn" onClick={this.submitFilter}>
            Готово
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
