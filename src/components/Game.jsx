import { useCallback, useEffect, useState, useRef, useReducer } from "react";
// import _ from "lodash"; // included in Create-React-App by default and imported as underscore
import Board from "./Board";
import ToggleButton from "./ToggleButton";

const initialisePlayers = () => {
  const players = [
    {
      rank: 1,
      name: "",
      colour: "",
      xo: "",
      status: "",
      score: 0
    },
    {
      rank: 2,
      name: "",
      colour: "",
      xo: "",
      status: "",
      score: 0
    }
  ];
  const xoId = Math.floor(Math.random() * 2); // where 1 - X  2 - O
  const xo = ["X", "O"][xoId];
  players[xoId].xo = xo;
  players[xoId === 0 ? 1 : 0].xo = xo === "X" ? "O" : "X";
  return players;
};

// who starts first
// 1 - X  2 - O
const initialiseFirstPlayer = () => {
  const idx = Math.floor(Math.random() * 2);
  return ["X", "O"][idx];
};

const initialiseWinners = () => {
  return { xo: "", winners: [], score: 0 };
};

const initialiseGame = {
  players: initialisePlayers(),
  currentPlayer: "",
  firstPlayer: initialiseFirstPlayer(),
  winners: initialiseWinners(),
  status: ""
};

// game reducer
const gameReducer = (state, action) => {
  switch (action.type) {
    case "update winners":
      return (() => {
        let { xo, winners, score } = action.payload;
        const players = [...state.players];
        const tempIdx = ((xo) =>
          players.findIndex((player) => player.xo === xo))(xo);
        const player = players[tempIdx];
        player.score += 1;
        players[tempIdx] = player;
        return {
          ...state,
          players: players,
          winners: {
            xo: xo,
            winners: winners,
            score: score
          }
        };
      })();
    case "reset winners":
      return (() => {
        const { jumpToInd } = action.payload;
        const { winners } = state; //({ winners }) = state;
        if (winners.score > 0) {
          const players = [...state.players];
          const tempIdx = ((xo) =>
            players.findIndex((player) => player.xo === xo))(winners.xo);
          const player = players[tempIdx];
          player.score += jumpToInd ? -1 : 1;
          players[tempIdx] = player;
          return {
            ...state,
            players: players,
            winners: {
              xo: "",
              winners: [],
              score: winners.score - 1
            }
          };
        }
      })();
    case "update status":
      return (() => {
        const { players, currentPlayer, firstPlayer, winners } = state;
        let { xo } = currentPlayer;
        const { currentGame, isNext } = action.payload;
        let player = players[players.findIndex((player) => player.xo === xo)];
        let tempStatus;
        if (winners.winners.length > 0) {
          tempStatus = `Winner: ${player.xo}${player.name !== "" ? "-" : ""}${
            player.name
          }`;
        } else if (
          currentGame.squares.filter((item) => item == null).length === 0
        ) {
          tempStatus = "No winner - draw!";
        } else {
          xo = isNext
            ? firstPlayer === "X"
              ? "X"
              : "O"
            : firstPlayer === "X"
            ? "O"
            : "X";
          tempStatus = `Next player: ${xo}${player.name !== "" ? "-" : ""}${
            player.name
          }`;
        }
        return { ...state, status: tempStatus };
      })();
    case "update current player":
      return (() => {
        const { xo } = action.payload;
        const { players } = state;
        const tempIdx = ((xo) =>
          players.findIndex((player) => player.xo === xo))(xo);
        return {
          ...state,
          currentPlayer: players[tempIdx]
        };
      })();
    case "request to restart":
      return (() => {
        return {
          ...state,
          firstPlayer: initialiseFirstPlayer(),
          winners: {},
          status: ""
        };
      })();
    case "request to start":
      return (() => {
        const { players } = state;
        const index = Math.floor(Math.random() * 2);
        const first = players[index].xo;
        return {
          ...state,
          firstPlayer: first,
          currentPlayer: players[index]
        };
      })();
    default:
    //do nothing;
  }
};

export default function Game() {
  const [history, setHistory] = useState({
    history: [
      {
        squares: Array(9).fill(null)
      }
    ]
  });

  //https://css-tricks.com/getting-to-know-the-usereducer-react-hook/
  const [game, dispatch] = useReducer(gameReducer, initialiseGame);
  const [selItems, setSelItems] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isNext, setIsNext] = useState(true); // next player
  const [moves, setMoves] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [started, setStarted] = useState(false);
  const [jumpToInd, setJumpToInd] = useState(false);
  const [lineStyle, setLineStyle] = useState({});
  const [target, setTarget] = useState(null);
  const boardRef = useRef(null);

  // winning line - useCallback REF
  const handleLineStyleRef = useCallback((boardRef) => {
    setTimeout(() => {
      setTarget(boardRef.getBoundingClientRect());
      // console.log(boardRef.className);
    }, 300);
  }, []);

  // strike the winner symbols
  useEffect(() => {
    if (!game.winners) return;
    if (game.winners.length !== 3) return;
    const temp = [...game.winners];
    temp.sort();
    const x = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6]
      ]
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
    let typ = "";
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
      case "horizontal":
        switch (pos) {
          case 0:
            setLineStyle({
              position: "absolute",
              left: rect.left,
              top: rect.top + rect.height * 0.16,
              width: rect.width
            });
            break;
          case 1:
            setLineStyle({
              position: "absolute",
              left: rect.left,
              top: rect.top + rect.height * 0.5,
              width: rect.width
            });
            break;
          case 2:
            setLineStyle({
              position: "absolute",
              left: rect.left,
              top: rect.top + rect.height * 0.85,
              width: rect.width
            });
            break;
          default:
          // do nothing
        }
        break;
      case "vertical":
        switch (pos) {
          case 0:
            setLineStyle({
              position: "absolute",
              left: rect.left + rect.width * 0.17,
              top: rect.top,
              width: "10px",
              height: rect.height
            });
            break;
          case 1:
            setLineStyle({
              position: "absolute",
              left: rect.left + rect.width * 0.5,
              top: rect.top,
              width: "10px",
              height: rect.height
            });
            break;
          case 2:
            setLineStyle({
              position: "absolute",
              left: rect.left + rect.width * 0.825,
              top: rect.top,
              width: "10px",
              height: rect.height
            });
            break;
          default:
          // do nothing
        }
        break;
      case "diagonal":
        switch (pos) {
          case 0:
            setLineStyle({
              position: "absolute",
              left: rect.left,
              top: rect.top, // rect.top + rect.height / 2,
              width: Math.sqrt(
                rect.width * rect.width + rect.height * rect.height
              ),
              transform: "rotate(48deg)",
              transformOrigin: "top left"
            });
            break;
          case 1:
            setLineStyle({
              position: "absolute",
              // left: rect.left + rect.width,
              top: rect.top + rect.height, // rect.top + rect.height / 2,
              width: Math.sqrt(
                rect.width * rect.width + rect.height * rect.height
              ),
              transform: "rotate(-48deg)",
              transformOrigin: "top left"
            });
            break;
          default:
          // do nothing
        }
        break;
      default:
      // do nothing
    }
  }, [game.winners, target]);

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
      [6, 7, 8]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // get the last click item and calc the offset
        dispatch({
          type: "update winners",
          payload: { xo: squares[a], winners: [a, b, c], score: 1 }
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
      ? game.firstPlayer === "X"
        ? "X"
        : "O"
      : game.firstPlayer === "X"
      ? "O"
      : "X";

    setHistory((prev) => ({
      ...prev,
      history: tempHistory.concat([{ squares }])
    }));
    setSelItems(selItems.slice(0, stepNumber).concat(item));
    setStepNumber(stepNumber + 1);
    setIsNext(!isNext);
    // get current player
    dispatch({
      type: "update current player",
      payload: {
        xo: squares[item]
      }
    });
    if (jumpToInd) setJumpToInd(false);
  }

  const doSetMoves = useCallback(() => {
    const newMoves = history.history.map((hist, move) => {
      const row = [0, 1, 2].includes(selItems[move - 1])
        ? "0"
        : [3, 4, 5].includes(selItems[move - 1])
        ? "1"
        : [6, 7, 8].includes(selItems[move - 1])
        ? "2"
        : "";
      const desc = move
        ? `Go to move ${move} (${selItems[move - 1] % 3}, ${row})`
        : "Go to game start";
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

  //reset current winners
  useEffect(() => {
    if (jumpToInd) {
      if (selItems.length !== stepNumber) {
        // reset score
        dispatch({
          type: "reset winners",
          payload: { jumpToInd: jumpToInd }
        });
      }
    }
  }, [jumpToInd, stepNumber, selItems]);

  const doSetGameStatus = useCallback(() => {
    dispatch({
      type: "update staus",
      payload: {
        currentGame: history.history[stepNumber],
        isNext: isNext
      }
    });
  }, [history, stepNumber, isNext]);

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
    //console.log(`hello${sortOrder}`);
    setSortAsc(sortOrder.toUpperCase() === "ASC");
  }

  useEffect(() => {
    // has the game started - then this must be request to restart
    if (started) {
      setHistory({
        history: [
          {
            squares: Array(9).fill(null)
          }
        ]
      });
      setSelItems([]);
      setStepNumber(0);
      setIsNext(true);
      setMoves([]);
      setSortAsc(true);
      dispatch({ type: "request to restart" });
    }
    // initialise firstPlayer and currentPlayer
    dispatch({ type: "request to start" });
    setStarted(true);
  }, [started]);

  function getScore() {
    const { players } = game;
    let temp = "";
    players.forEach((item, index) => {
      temp += `${item.name}-${item.score.toString()} `;
    });
    return temp;
  }

  function getGameStatus() {
    const { status } = game;
    return status;
  }

  function getWinners() {
    const { winners } = game;
    return winners.winners;
  }

  function getCurrentPlayer() {
    const { currentPlayer } = game;
    return currentPlayer;
  }

  return (
    <div className="game">
      {started && (
        <>
          <div>{getGameStatus()}</div>
          <div>({getScore()})</div>
          <div>stepNumber = {stepNumber}</div>
          <div ref={handleLineStyleRef} className="board">
            <Board
              ref={boardRef}
              squares={history.history[stepNumber].squares}
              winners={getWinners() ? getWinners() : []}
              selItems={selItems}
              stepNumber={stepNumber}
              currPlayer={getCurrentPlayer()}
              onClick={handleClick}
              jumpToInd={jumpToInd} // indicates that user is moving to previous move
            />
          </div>
          <div className="game-info">
            <ToggleButton
              toggle={handleSort}
              labels={["Desc", "Asc"]}
              changeOpacity={false}
            />
            <ol reversed={!sortAsc}>
              {sortAsc ? moves.slice().sort() : moves.slice().reverse()}
            </ol>
          </div>
          {getWinners() && getWinners().length === 3 ? (
            <div className="line" style={lineStyle} />
          ) : null}
        </>
      )}
    </div>
  );
}

// https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/
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
