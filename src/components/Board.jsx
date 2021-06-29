import React from "react";
import Square from "./Square";

function Board() {
  function handleClick(value) {
    alert(value);
  }

  /*
const object = {'a': 1, 'b': 2, 'c' : 3};
for (const [key, value] of Object.entries(object)) {
  console.log(key, value);
}
*/

  const squares = { 0: [0, 1, 2], 1: [3, 4, 5], 2: [6, 7, 8] };

  function renderSquarex(k) {
    return squares[k].map((item, index) => {
      return (
        <Square
          id={item}
          key={item}
          text={item}
          color="green"
          onClick={handleClick}
        />
      );
    });
  }

  function renderSquare() {
    return Object.keys(squares).map((item, idx) => {
      return (
        <div key={idx} className="board-row">
          {renderSquarex(item)}
        </div>
      );
    });
  }

  return <div>{renderSquare()}</div>;
}

export default Board;
