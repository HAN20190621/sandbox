import { useCallback, useEffect, useState, useReducer } from "react";
// import _ from "lodash"; // included in Create-React-App by default and imported as underscore
import Board from "./Board";
import ToggleButton from "./ToggleButton";
import Button from "./Button";

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

const initialiseGame = (() => {
  const players = initialisePlayers();
  const firstPlayer = initialiseFirstPlayer();
  const tempIdx = ((xo) => players.findIndex((player) => player.xo === xo))(
    firstPlayer
  );
  const currentPlayer = players[tempIdx];
  return {
    players: players,
    currentPlayer: currentPlayer,
    firstPlayer: firstPlayer,
    winners: initialiseWinners()
  };
})();

// game reducer
const gameReducer = (state, action) => {
  console.log(action.type);
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
        } else {
          return { ...state };
        }
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
    case "request to start":
      return (() => {
        const { players } = state;
        const index = Math.floor(Math.random() * 2);
        const first = players[index].xo;
        return {
          ...state,
          firstPlayer: first,
          currentPlayer: players[index],
          winners: {
            xo: "",
            winners: [],
            score: 0
          }
        };
      })();
    default:
      throw new Error(); //do nothing;
  }
};

export default function Game(props) {
  const [history, setHistory] = useState({
    history: [
      {
        squares: Array(9).fill(null)
      }
    ]
  });

  const [game, dispatch] = useReducer(gameReducer, initialiseGame);
  const [selItems, setSelItems] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isNext, setIsNext] = useState(true); // next player
  const [moves, setMoves] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [jumpToInd, setJumpToInd] = useState(false);
  const [lineStyle, setLineStyle] = useState({});
  const [target, setTarget] = useState(null);
  const [status, setStatus] = useState(""); //game status

  // strike - useCallback REF
  const handleLineStyleRef = useCallback((boardRef) => {
    if (boardRef) {
      setTimeout(() => {
        setTarget(boardRef.getBoundingClientRect());
      }, 300);
    }
  }, []);

  // strike the winner symbols
  useEffect(() => {
    const winners = game.winners;
    if (winners.winners === undefined) return;
    if (winners.winners.length !== 3) return;
    const temp = [...winners.winners];
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
    const copyHistory = history.history.slice(0, stepNumber + 1); // advance
    const current = copyHistory[copyHistory.length - 1];
    const squares = current.squares.slice(); // copy
    if (squares[item]) return; // check if item exists // calculate winner????
    //
    squares[item] = isNext
      ? game.firstPlayer === "X"
        ? "X"
        : "O"
      : game.firstPlayer === "X"
      ? "O"
      : "X";
    //console.log(squares);
    setHistory((prev) => ({
      ...prev,
      history: copyHistory.concat([{ squares }])
    }));
    setSelItems(selItems.slice(0, stepNumber).concat(item));
    setStepNumber(copyHistory.length);
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
    const { players, currentPlayer, firstPlayer, winners } = game;
    let { xo } = currentPlayer;
    const currentGame = history.history[stepNumber];
    const tempIdx = ((xo) => players.findIndex((player) => player.xo === xo))(
      xo
    );
    const player = players[tempIdx];
    let tempStatus;
    if (winners.winners && winners.winners.length > 0) {
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
    setStatus(tempStatus);
  }, [game, history, stepNumber, isNext]);

  useEffect(() => {
    // get player moves
    doSetMoves();
    // winner, score and game status
    doSetGameStatus();
    //
  }, [doSetMoves, doSetGameStatus]); // history.history[stepNumber].squares );

  function handleRestart() {
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
    // reset game - players
    dispatch({ type: "request to start" });
  }

  function jumpTo(step) {
    setStepNumber(step);
    setIsNext(step % 2 === 0);
  }

  function handleSort(sortOrder) {
    setSortAsc(sortOrder);
  }

  function getScore() {
    const { players } = game;
    let temp = "";
    players.forEach((item, index) => {
      temp += `${item.name}-${item.score.toString()} `;
    });
    return temp;
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
      <>
        <Button
          text="Restart"
          colour="green"
          onClick={() => {
            //handle-restart - dispatch request to restart
            handleRestart();
          }}
        />
        <div>{status}</div>
        <div>({getScore()})</div>
        <div>stepNumber = {stepNumber}</div>
        <div ref={handleLineStyleRef} className="board">
          <Board
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
    </div>
  );
}

//https://css-tricks.com/getting-to-know-the-usereducer-react-hook/
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
