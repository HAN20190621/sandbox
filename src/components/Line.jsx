import { useReducer, useEffect } from "react";
import lineReducer from "../reducers/lineReducer/lineReducer";

const NONE = {};
const initialiseState = { style: NONE };

// this component draws a line on the winner (squares)
export default function Line({ winners, positions, colour }) {
  const [line, dispatch] = useReducer(lineReducer, initialiseState);

  useEffect(() => {
    if (positions === undefined) return;
    // get the last click item and calc the offset
    //console.log(positions);
    dispatch({
      type: "recalculate style",
      payload: { winners: winners, rect: positions }
    });
  }, [winners, positions]);

  return (
    <>
      <button
        onClick={() => {
          dispatch({
            type: "recalculate style",
            payload: {
              winners: [2, 4, 6],
              rect: {
                item6: {
                  width: 100,
                  height: 5,
                  top: 100,
                  left: 5
                }
              }
            }
          });
        }}
      >
        Click me
      </button>
      <div style={line.style}></div>
    </>
  );
}

Line.defaultProps = {
  positions: {
    item0: {
      width: 100,
      height: 5,
      top: 100,
      left: 5
    }
  },
  colour: "red",
  winners: [8, 4, 0]
};
