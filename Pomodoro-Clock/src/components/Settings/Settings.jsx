import React from 'react';
import PropTypes from 'prop-types';

import Minutes from '../Minutes/Minutes';
import Button from '../Button/Button'; 

const Settings = ({heading, id, increment, decrement, time}) => {
    return (
      <div className="Settings" id={id} onReset = {this._handleReset}>
        <h2 className="Settings--header">{heading}</h2>
        <div className="Settings--container" >
          <Button src='https://png.icons8.com/material-outlined/24/ffffff/plus.png' handleClick={increment} alt = "plus" id = "increment" />
          <Minutes minutes={time} />
          <Button src='https://png.icons8.com/small/24/ffffff/minus.png' handleClick={decrement} alt = "minus" id = "decrement" />
        </div>
      </div>
  )
};

Settings.propTypes = {
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default Settings;