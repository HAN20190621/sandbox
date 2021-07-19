import React from 'react';

// https://react.school/ui/button

const Square = (props) => (
  // const targetRef = useRef(null);
  // useEffect(() => {
  //   // if (props.idx === 4) {
  //   //   props.setTarget(targetRef.current);
  //   // }
  // });

  <button
    // ref={targetRef}
    className="square"
    style={props.winStyle}
    key={`sq${props.idx}`}
    value={props.value}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);
export default Square;
