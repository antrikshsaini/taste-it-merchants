import React from "react";
import Checkbox from "./checkbox.svg"
import PropTypes from 'prop-types';

const CheckboxIcon = ({ name }) => (
  <svg>
    <use xlinkHref={`${Checkbox}#icon-${name}`} />
  </svg>
);

CheckboxIcon.propTypes = {
  name: PropTypes.string.isRequired
};

export default CheckboxIcon;