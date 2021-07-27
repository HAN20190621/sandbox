import React from "react";
import PropTypes from "prop-types";
// https://react.school/ui/button

const Square = ({ idx, value, style, onClick }) => (
  <button
    className="square"
    style={style}
    value={value}
    key={`sq${idx}`}
    onClick={onClick}
  >
    {value}
  </button>
);

Square.propTypes = {
  idx: PropTypes.number,
  style: PropTypes.object,
  value: PropTypes.string,
  onClick: PropTypes.func
};

Square.defaultProps = {
  idx: 0,
  style: { color: "red" },
  value: "x",
  onClick: () => {}
};

export default Square;
