import React from 'react';
import PropTypes from 'prop-types';
// https://react.school/ui/button

const Square = ({ idx, value, style, onClick, className }) => {
  function handleOnClick(event) {
    //console.log(event.target.clientHeight);
    //console.log(event.target.clientWidth);
    console.log(event.target.getBoundingClientRect());
    onClick();
  }

  return (
    <button
      className={className}
      style={style}
      value={value}
      key={`sq${idx}`}
      onClick={handleOnClick}
    >
      {value}
    </button>
  );
};

Square.propTypes = {
  idx: PropTypes.number,
  style: PropTypes.object,
  value: PropTypes.string,
  // onClick: PropTypes.func
};

Square.defaultProps = {
  idx: 0,
  style: { color: 'red' },
  value: 'x',
  // onClick: () => {},
};

export default Square;
