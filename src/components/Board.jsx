import React from 'react';
import Square from './Square';

//  https://www.pluralsight.com/guides/applying-classes-conditionally-react
const Board = (props) => {
  const { squares } = props;
  const { winners } = props;
  const { selItems } = props;
  const { stepNumber } = props;
  const { currPlayer } = props;
  const { jumpToInd } = props;

  const winStyle = { color: currPlayer.colour, fontWeight: 'bold' };
  const normalStyle = {
    color: 'black',
    fontWeight: 'normal',
  }; // , color:'black'

  function setWinStyle(index) {
    // console.log('selItems=' + selItems + ' stepNumber=' + stepNumber);
    return winners.includes(index) || selItems[stepNumber - 1] === index
      ? winStyle
      : normalStyle; // selItems[stepNumber-1] === index
  }

  // function handleTarget(target) {
  //   props.setTarget(target);
  // }

  function renderSqr(r, i) {
    return (
      <div key={`br${i}`} className="board-row">
        {r.map((val, idx) => {
          const idx_ = i + idx;
          return (
            <div key={`col${idx_}`}>
              <Square
                key={idx_}
                winStyle={jumpToInd ? normalStyle : setWinStyle(idx_)}
                value={squares[idx_]}
                idx={idx_}
                onClick={() => {
                  props.onClick(idx_);
                }}
                // setTarget={handleTarget}
              />
              {idx !== 2 ? (
                <div key={`sv${idx_}`} className={`sv${idx}`} />
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  function renderSquare() {
    const rows = [];
    for (let idx = 0; idx < squares.length; idx++) {
      const isOk = idx % 3 === 0;
      const r = isOk ? squares.slice(idx, idx + 3) : null;
      if (isOk) rows.push(renderSqr(r, idx));
    }
    return rows.map((row, idx) => (
      <div key={`r${idx}`}>
        {row}
        {idx !== 2 && <div className="sh" key={`sh${idx}`} />}
      </div>
    ));
  }

  return <>{renderSquare()}</>;
};

Board.defaultProps = {
  currPlayer: { colour: 'green' },
  squares: Array(9).fill(null),
  winners: ['x'],
  selItems: [0, 12, 3, 4],
  jumpToInd: true,
};

export default Board;
