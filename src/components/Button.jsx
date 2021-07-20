import React from "react";

const Button = ({ text, colour, onClick, className }) => {
  return (
    <>
      <button
        className={className}
        style={{ backgroundColor: colour }}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

Button.defaultProps = {
  text: "",
  color: "green",
  onClick: () => {},
  className: "btn"
};

export default Button;
