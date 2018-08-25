import React from "react";
import PropTypes from "prop-types";

import Minutes from "../Minutes/Minutes";
import Button from "../Button/Button";

const Settings = ({
  heading,
  id,
  increment,
  decrement,
  time,
  label,
  incrementId,
  decrementId
}) => {
  return (
    <div className="Settings" id={id} onReset={this._handleReset}>
      <h2 className="Settings--header" id={label}>
        {heading}
      </h2>
      <div className="Settings--container">
        <Button
          src="https://png.icons8.com/material-outlined/24/ffffff/plus.png"
          handleClick={increment}
          alt="plus"
          id={incrementId}
        />
        <Minutes minutes={time} />
        <Button
          src="https://png.icons8.com/small/24/ffffff/minus.png"
          handleClick={decrement}
          alt="minus"
          id={decrementId}
        />
      </div>
    </div>
  );
};

Settings.propTypes = {
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  incrementId: PropTypes.string.isRequired,
  decrementId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Settings;
