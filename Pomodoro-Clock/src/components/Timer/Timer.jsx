import React, { Component } from "react";
import PropTypes from "prop-types";

import secondsToMinutes from "../secondsToMinutes.js";

export default class Timer extends Component {
  render() {
    const { seconds, heading, label, min } = this.props;
    const time = secondsToMinutes(seconds);
    const timeStr = `${time.m}:${time.s}`;

    return (
      <div className="Timer bg-dark text-white">
        <h1 id={label}>{heading}</h1>
        <h2 id={min}>{timeStr}</h2>
      </div>
    );
  }
}

Timer.propTypes = {
  heading: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired
};

Timer.defaultProps = {
  seconds: 1500
};
