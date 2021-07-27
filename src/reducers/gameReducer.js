// game reducer
//The reason that your quantity is being incremented twice is
//because you would be using React.StrictMode which
//invokes your reducer twice.
export default function gameReducer(state, action) {
  //console.log(action.type);
  let xo, players, tempIdx, winners, player;
  switch (action.type) {
    case "update current player":
      xo = action.payload.xo;
      players = state.players;
      tempIdx = ((xo) => players.findIndex((player) => player.xo === xo))(xo);
      return {
        ...state,
        currentPlayer: players[tempIdx]
      };
    case "request to start":
      players = state.players;
      tempIdx = Math.floor(Math.random() * 2);
      const first = players[tempIdx].xo;
      return {
        ...state,
        firstPlayer: first,
        currentPlayer: players[tempIdx],
        winners: {
          xo: "",
          winners: [],
          score: 0
        }
      };
    case "update winners":
      // xo = action.payload.xo;
      // winners = action.payload.winners;
      // players = [...state.players];
      // tempIdx = ((xo) => players.findIndex((player) => player.xo === xo))(xo);
      // player = players[tempIdx];
      // player.score += 1;
      // players[tempIdx] = player;
      // return {
      //   ...state,
      //   players: players,
      //   winners: {
      //     xo: xo,
      //     winners: winners,
      //     score: player.score
      //   }
      // };
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.item_id === action.payload.item_id
      );
      if (existingCartItemIndex > -1) {
        const newState = [
          ...state.items.slice(0, existingCartItemIndex),
          {
            ...state.items[existingCartItemIndex],
            quantity: state.items[existingCartItemIndex].quantity + 1
          },
          ...state.items.slice(existingCartItemIndex + 1)
        ];
        return newState;
      }
      return [...state.items, action.payload];
    case "reset winners":
      const { jumpToInd } = action.payload;
      winners = state.winners; //({ winners }) = state;
      if (winners.score > 0) {
        players = [...state.players];
        tempIdx = ((xo) => players.findIndex((player) => player.xo === xo))(
          winners.xo
        );
        player = players[tempIdx];
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
    default:
      throw new Error(); //do nothing;
  }
}
