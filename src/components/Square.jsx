import React from "react";
import PropTypes from "prop-types";

const Square = ({ color, text, onClick }) => {
  return (
    <button
      className="square"
      key={text}
      style={{ ...styles.square, backgroundColor: color }}
      onClick={(event) => {
        onClick(event.target.innerHTML);
      }}
    >
      {text}
    </button>
  );
};

Square.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
};

Square.defaultProps = {
  color: "green",
  text: "o",
  onClick: () => {}
};

const styles = {
  square: {
    backgroundColor: "#fff",
    fontSize: "large",
    fontWeight: "bold",
    height: "34px",
    width: "34px",
    margin: "5px",
    padding: "0",
    textAlign: "center"
  }
};

export default Square;
