import React from "react";
import Proptypes from "prop-types";

const Square = ({ color, text, onClick }) => {
  return (
    <button
      className="square"
      key={text}
      value={text}
      style={{ backgroundColor: color }}
      onClick={(event) => {
        onClick(event.target.value);
      }}
    >
      {text}
    </button>
  );
};

Square.propTypes = {
  value: Proptypes.string,
  onClick: Proptypes.func
};

Square.defaultValues = {
  value: "0"
};

export default Square;
