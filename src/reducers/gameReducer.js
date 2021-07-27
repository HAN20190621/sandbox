// game reducer
export default function gameReducer(state, action) {
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
}
