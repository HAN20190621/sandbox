import React from 'react';
import PropTypes from 'prop-types';

const Square = ({ color, text, onClick }) => {
  return (
    <button
      className="square"
      key={text}
      style={{ backgroundColor: color }}
      onClick={(event) => {
        onClick(event.target.innerHTML);
      }}
    >
      {text}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

Square.defaultValues = {
  value: '0',
};

export default Square;
