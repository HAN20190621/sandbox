import React from "react";
import PropTypes from "prop-types";

const Square = ({ selectedStyle, text, onClick }) => {
  return (
    <button
      className="square"
      key={text}
      style={{ selectedStyle }}
      onClick={(event) => {
        onClick(event.target.innerHTML);
      }}
    >
      {text}
    </button>
  );
};

Square.propTypes = {
  selectedStyle: PropTypes.object,
  text: PropTypes.string,
  onClick: PropTypes.func
};

Square.defaultProps = {
  selectedStyle: {},
  text: "o",
  onClick: () => {}
};

// const styles = {
//   square: {
//     backgroundColor: "#fff",
//     fontSize: "large",
//     fontWeight: "bold",
//     height: "34px",
//     width: "34px",
//     margin: "5px",
//     padding: "0",
//     textAlign: "center"
//   }
// };

export default Square;
