// https://react.school/ui/button
import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";

const Square = ({ idx, value, style, onClick, className, winPos }) => {
  const [itemCoord, setItemCoord] = useState({});

  const itemRef = useCallback((ref) => {
    //console.log(ref.getBoundingClientRect());
    setItemCoord(ref?.getBoundingClientRect());
  }, []);

  useEffect(() => {
    console.log(itemCoord);
  }, [itemCoord]);

  return (
    <>
      <button
        ref={itemRef}
        className={className}
        style={style}
        value={value}
        key={`sq${idx}`}
        onClick={onClick}
      >
        {value}
      </button>
      {/* {showLine() && <div className="line" style={lineStyle} />} */}
    </>
  );
};

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
