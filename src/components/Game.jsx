import React, { useCallback, useEffect, useState } from 'react';
// import _ from "lodash"; // included in Create-React-App by default and imported as underscore
import Players from './Players';
import Board from './Board';
import ToggleButton from '../shared/ToggleButton';

// https://dev.to/danielleye/react-class-component-vs-function-component-with-hooks-13dg
// import styled from "styled-components";
// https://stackoverflow.com/questions/60503263/react-hooks-how-to-target-an-element-child-with-useref-with-a-variable-decla
// //https://flaviocopes.com/react-hook-usecallback/

// https://stackblitz.com/edit/react-r9opxy
// const usePrevious = (value) => {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// };

function Game() {
  const [history, setHistory] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
  });

  const [selItems, setSelItems] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);
  const [firstPlayer, setFirstPlayer] = useState(getFirstPlayer()); // first player
  const [isNext, setIsNext] = useState(true); // next player
  const [moves, setMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [winners, setWinners] = useState({}); // xo, selected items
  const [sortAsc, setSortAsc] = useState(true);
  const [started, setStarted] = useState(false);
  const [currPlayer, setCurrPlayer] = useState({});
  const [jumpToInd, setJumpToInd] = useState(false);
  const [lineStyle, setLineStyle] = useState({});
  const [target, setTarget] = useState(null);

  const initialisePlayers = () => {
    const players = [
      {
        rank: 1,
        name: '',
        colour: '',
        xo: '',
        status: '',
        score: 0,
      },
      {
        rank: 2,
        name: '',
        colour: '',
        xo: '',
        status: '',
        score: 0,
      },
    ];
    const xoId = Math.floor(Math.random() * 2); // where 1 - X  2 - O
    const xo = ['X', 'O'][xoId];
    players[xoId].xo = xo;
    players[xoId === 0 ? 1 : 0].xo = xo === 'X' ? 'O' : 'X';
    return players;
  };

  const [players, setPlayers] = useState(initialisePlayers());

  // who starts first
  // 1 - X  2 - O
  function getFirstPlayer() {
    const idx = Math.floor(Math.random() * 2);
    return ['X', 'O'][idx];
  }

  // useCallback REF
  const handleLineStyleRef = useCallback((boardRef) => {
    setTimeout(() => {
      setTarget(boardRef.getBoundingClientRect());
      // console.log(boardRef.className);
    }, 300);
  }, []);

  // strike the winner symbols
  useEffect(() => {
    if (!winners.winners) return;
    if (winners.winners.length !== 3) return;
    const temp = [...winners.winners];
    temp.sort();
    const x = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    if (target === null) return;
    // horizontal = adjust left
    // if index = 0 then adjust top -
    // if index = 1 then do nothing
    // if index = 3 then adjust top +
    // rotate 0 degree

    // vertical = adjust left
    // if index = 0 then adjust top -
    // if index = 1 then do nothing
    // if index = 3 then adjust top +
    // rotate 90 degree

    // diagonal = adjust left
    // if index = 0 then adjust top -
    // if index = 1 then do nothing
    // if index = 3 then adjust top +
    // rotate 45 degree
    let typ = '';
    let pos = 0;
    let same = false;
    const rect = target;
    // https://stackoverflow.com/questions/60881446/receive-dimensions-of-element-via-getboundingclientrect-in-react
    // console.log(`${rect.left} ${rect.top}`);
    // console.log(`TYP=${typ}`);
    for (const [k, val] of Object.entries(x)) {
      typ = k;
      for (let i = 0; i < val.length; i++) {
        same = val[i].every((j, idx) => j === temp[idx]);
        if (same) {
          pos = i;
          break;
        }
      }
      if (same) break;
    }
    //
    switch (typ) {
      case 'horizontal':
        switch (pos) {
          case 0:
            setLineStyle({
              position: 'absolute',
              left: rect.left,
              top: rect.top + rect.height * 0.16,
              width: rect.width,
            });
            break;
          case 1:
            setLineStyle({
              position: 'absolute',
              left: rect.left,
              top: rect.top + rect.height * 0.5,
              width: rect.width,
            });
            break;
          case 2:
            setLineStyle({
              position: 'absolute',
              left: rect.left,
              top: rect.top + rect.height * 0.85,
              width: rect.width,
            });
            break;
          default:
          // do nothing
        }
        break;
      case 'vertical':
        switch (pos) {
          case 0:
            setLineStyle({
              position: 'absolute',
              left: rect.left + rect.width * 0.17,
              top: rect.top,
              width: '10px',
              height: rect.height,
            });
            break;
          case 1:
            setLineStyle({
              position: 'absolute',
              left: rect.left + rect.width * 0.5,
              top: rect.top,
              width: '10px',
              height: rect.height,
            });
            break;
          case 2:
            setLineStyle({
              position: 'absolute',
              left: rect.left + rect.width * 0.825,
              top: rect.top,
              width: '10px',
              height: rect.height,
            });
            break;
          default:
          // do nothing
        }
        break;
      case 'diagonal':
        switch (pos) {
          case 0:
            setLineStyle({
              position: 'absolute',
              left: rect.left,
              top: rect.top, // rect.top + rect.height / 2,
              width: Math.sqrt(
                rect.width * rect.width + rect.height * rect.height
              ),
              transform: 'rotate(48deg)',
              transformOrigin: 'top left',
            });
            break;
          case 1:
            setLineStyle({
              position: 'absolute',
              // left: rect.left + rect.width,
              top: rect.top + rect.height, // rect.top + rect.height / 2,
              width: Math.sqrt(
                rect.width * rect.width + rect.height * rect.height
              ),
              transform: 'rotate(-48deg)',
              transformOrigin: 'top left',
            });
            break;
          default:
          // do nothing
        }
        break;
      default:
      // do nothing
    }
  }, [winners, target]);

  // set winners
  useEffect(() => {
    const tempHistory = history.history.slice(0, stepNumber + 1);
    const curr = tempHistory[tempHistory.length - 1];
    const squares = curr.squares.slice(); // copy
    //
    const lines = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // get the last click item and calc the offset
        const newWinners = { xo: squares[a], winners: [a, b, c], score: 1 };
        setWinners(newWinners);
        setPlayers((prevPlayers) => {
          const newPlayers = [...prevPlayers];
          const tempIdx = ((xo) =>
            newPlayers.findIndex((player) => player.xo === xo))(newWinners.xo);
          const newPlayer = newPlayers[tempIdx];
          newPlayer.score += 1;
          newPlayers[tempIdx] = newPlayer;
          return newPlayers;
        });
      }
    }
  }, [history, stepNumber]);

  function handleClick(item) {
    const tempHistory = history.history.slice(0, stepNumber + 1);
    const curr = tempHistory[tempHistory.length - 1];
    const squares = curr.squares.slice(); // copy
    //
    squares[item] = isNext
      ? firstPlayer === 'X'
        ? 'X'
        : 'O'
      : firstPlayer === 'X'
      ? 'O'
      : 'X';

    setHistory((prev) => ({
      ...prev,
      history: tempHistory.concat([{ squares }]),
    }));

    setSelItems(selItems.slice(0, stepNumber).concat(item));
    setStepNumber(stepNumber + 1);
    setIsNext(!isNext);
    // get index
    const tempIdx = ((xo) => players.findIndex((player) => player.xo === xo))(
      squares[item]
    );
    setCurrPlayer(players[tempIdx]);
    if (jumpToInd) setJumpToInd(false);
  }

  // https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/
  // const { xo } = currPlayer;
  const getPlayer = useCallback((players, xo) => {
    const xoId = players.findIndex((player) => player.xo === xo);
    return players[xoId];
  }, []);

  const doSetMoves = useCallback(() => {
    const newMoves = history.history.map((hist, move) => {
      const row = [0, 1, 2].includes(selItems[move - 1])
        ? '0'
        : [3, 4, 5].includes(selItems[move - 1])
        ? '1'
        : [6, 7, 8].includes(selItems[move - 1])
        ? '2'
        : '';
      const desc = move
        ? `Go to move ${move} (${selItems[move - 1] % 3}, ${row})`
        : 'Go to game start';
      return (
        <li key={move}>
          <button
            onClick={() => {
              setJumpToInd(true);
              jumpTo(move);
            }}
          >
            {desc}
          </button>
        </li>
      );
    });
    setMoves(newMoves);
  }, [history, selItems]);

  useEffect(() => {
    if (winners.xo === undefined) return;
    if (jumpToInd) {
      if (selItems.length !== stepNumber && winners.score > 0) {
        setWinners((prevWinners) => {
          const { score } = prevWinners;
          return { ...prevWinners, score: score - 1, winners: [], xo: '' };
        });
        setPlayers((prevPlayers) => {
          const newPlayers = [...prevPlayers];
          const tempIdx = ((xo) =>
            newPlayers.findIndex((player) => player.xo === xo))(winners.xo);
          const newPlayer = newPlayers[tempIdx];
          newPlayer.score += jumpToInd ? -1 : 1;
          newPlayers[tempIdx] = newPlayer;
          return newPlayers;
        });
      }
    }
  }, [winners, jumpToInd, stepNumber, selItems]);

  const doSetGameStatus = useCallback(() => {
    let tempStatus;
    let newPlayer;
    const curr = history.history[stepNumber];
    // calculate winner
    let { xo } = currPlayer;
    if (winners.winners && winners.winners.length > 0) {
      newPlayer = getPlayer(players, xo);
      tempStatus = `Winner: ${newPlayer.xo}${newPlayer.name !== '' ? '-' : ''}${
        newPlayer.name
      }`;
    } else if (curr.squares.filter((item, idx) => item == null).length === 0) {
      tempStatus = 'No winner - draw!';
    } else {
      xo = isNext
        ? firstPlayer === 'X'
          ? 'X'
          : 'O'
        : firstPlayer === 'X'
        ? 'O'
        : 'X';
      // const xos = players.map((player, index) => player.xo);
      // const idx = xos.indexOf(xox);
      // newPlayer = idx < 0 ? players[0] : players[idx];
      newPlayer = getPlayer(players, xo);
      tempStatus = `Next player: ${xo}${newPlayer.name !== '' ? '-' : ''}${
        newPlayer.name
      }`;
    }
    setGameStatus(tempStatus);
  }, [
    history,
    stepNumber,
    winners,
    firstPlayer,
    isNext,
    players,
    currPlayer,
    getPlayer,
  ]);

  useEffect(() => {
    if (started) {
      // get player moves
      doSetMoves();
      // winner, score and game status
      doSetGameStatus();
      //
    }
  }, [started, doSetMoves, doSetGameStatus]); // history.history[stepNumber].squares );

  function jumpTo(step) {
    setStepNumber(step);
    setIsNext(step % 2 === 0);
  }

  function handleSort(sortOrder) {
    console.log(`hello${sortOrder}`);
    setSortAsc(sortOrder.toUpperCase() === 'ASC');
  }

  function handleStartGame() {
    // has the game started - then this must be request to restart
    if (started) {
      setHistory({
        history: [
          {
            squares: Array(9).fill(null),
          },
        ],
      });
      setSelItems([]);
      setStepNumber(0);
      setFirstPlayer(getFirstPlayer());
      setIsNext(true);
      setMoves([]);
      setGameStatus('');
      setWinners({});
      setSortAsc(true);
    }

    const index = Math.floor(Math.random() * 2);
    const first = players[index].xo;
    setFirstPlayer(first);
    // initialise current newPlayer
    setCurrPlayer(players[index]);
    setStarted(true);
  }

  function getScore() {
    let temp = '';
    players.forEach((item, index) => {
      temp += `${item.name}-${item.score.toString()} `;
    });
    return temp;
  }

  function handleSetPlayers(newPlayers) {
    setPlayers(newPlayers);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Players players={players} setPlayers={handleSetPlayers} />
        {(() =>
          players.filter((player) => player.name !== '').length === 2 ? (
            <ToggleButton
              toggle={handleStartGame}
              labels={started ? ['Restart'] : ['Start']}
              changeOpacity={false}
            />
          ) : null)()}
      </div>
      {started && (
        <>
          <div>{gameStatus}</div>
          <div>({getScore()})</div>
          <div>stepNumber = {stepNumber}</div>
          <div ref={handleLineStyleRef} className="board">
            <Board
              squares={history.history[stepNumber].squares}
              winners={winners.winners ? winners.winners : []}
              selItems={selItems}
              stepNumber={stepNumber}
              currPlayer={currPlayer}
              onClick={handleClick}
              jumpToInd={jumpToInd} // indicates that user is moving to previous move
            />
          </div>
          <div className="game-info">
            <ToggleButton
              toggle={handleSort}
              labels={['Desc', 'Asc']}
              changeOpacity={false}
            />
            <ol reversed={!sortAsc}>
              {sortAsc ? moves.slice().sort() : moves.slice().reverse()}
            </ol>
          </div>
          {winners.winners && winners.winners.length === 3 ? (
            <div className="line" style={lineStyle} />
          ) : null}
        </>
      )}
    </div>
  );
}

export default Game;
