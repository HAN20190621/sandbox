import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Player from './Player';
import EditPlayer from './EditPlayer';
import { Link, useLocation } from 'react-router-dom';

// players, handlePlayers
export default function Players({ players, setPlayers }) {
  const [init, setInit] = useState(false);
  const [show, setShow] = useState(false);
  const [dirty, setDirty] = useState([]);
  const [currPlayer, setCurrPlayer] = useState(null);
  const [selTarget, setSelTarget] = useState(null);
  //
  const location = useLocation();
  const [coords, setCoords] = useState({});
  const [playerRef, setPlayerRef] = useState(null);

  useEffect(() => {
    //console.log(`Players${players.length}`);
    if (init) return;
    setDirty([
      { rank: 1, isDirty: false },
      { rank: 2, isDirty: false },
    ]);
    setInit(true);
  }, [init, players]);

  function setIsDirty(rank, isDirty) {
    const all = [...dirty];
    const index = all.findIndex((item) => item.rank === rank);
    all[index] = { rank, isDirty };
    setDirty(all);
  }

  function getIsDirty(rank) {
    const all = [...dirty];
    const index = all.findIndex((item) => item.rank === rank);
    return all[index].isDirty;
  }

  function handleClearName(player) {
    const newPlayers = [...players];
    const index = newPlayers.findIndex((item) => item.rank === player.rank);
    newPlayers[index] = player;
    setPlayers(newPlayers);
    setIsDirty(player.rank, false);
  }

  // save player details on form close
  function closeModal(player) {
    const newPlayer = { ...player };
    const newPlayers = [...players];
    const index = newPlayers.findIndex(
      (player) => player.rank === newPlayer.rank
    );
    newPlayers[index] = newPlayer;
    setPlayers(newPlayers);
    setCurrPlayer(null);
    setShow(false);
    setSelTarget(null);
  }

  const updatePlayerCoords = (control) => {
    const rect = control.getBoundingClientRect();
    setCoords({
      //left: rect.x + rect.width / 2, // add half the width of the button for centering
      //top: rect.y + window.scrollY + 50, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
      left: rect.left - 38,
      top: rect.top + 12 + 50,
    });
  };

  function handleShowModal(show, player, target) {
    if (show) {
      // if show === false and target is null then closing
      const newPlayers = [...players];
      let newPlayer = { ...player };
      const update = currPlayer !== null;
      if (update) {
        if (currPlayer.rank !== player.rank && getIsDirty(currPlayer.rank)) {
          // then save previous player
          newPlayer = { ...currPlayer };
          newPlayer.name = selTarget.innerText;
          newPlayer.colour = selTarget.style.backgroundColor;
          // update the list
          const index = newPlayers.findIndex(
            (player) => player.rank === newPlayer.rank
          );
          newPlayers[index] = newPlayer;
          setPlayers(newPlayers);
        }
      }
      setCurrPlayer(player);
      setShow(show);
      setSelTarget(target);
    } else {
      closeModal(player);
    }
  }

  // on change - change the target
  function handleOnChange(player) {
    const newDirty = [...dirty];
    const index = newDirty.findIndex((item) => item.rank === player.rank);
    const dirtyItem = newDirty[index];
    // set isDirty = true
    if (!dirtyItem.isDirty) setIsDirty(dirtyItem.rank, true);
    selTarget.innerText = player.name;
    selTarget.style.backgroundColor = player.colour;
  }

  function handleUpdatePlayerCoords(newRef) {
    setPlayerRef(newRef);
    updatePlayerCoords(newRef.current);
  }

  return (
    <>
      <div className="players">
        {players.map((player, idx) => (
          <Player
            key={idx}
            id={idx}
            name={`player${player.rank}`}
            player={player}
            clearName={handleClearName}
            showModal={handleShowModal}
            handleUpdatePlayerCoords={handleUpdatePlayerCoords}
          />
        ))}
      </div>
      <Modal show={show} id="modal-root">
        <EditPlayer
          player={currPlayer}
          showModal={handleShowModal}
          onChange={handleOnChange}
          coords={coords}
          updatePlayerCoords={() => updatePlayerCoords(playerRef.current)}
        />
      </Modal>
    </>
  );
}

Players.defaultProps = {
  players: [
    {
      rank: 1,
      name: 'tik-tak-toe',
      colour: 'green',
      xo: 'x',
      status: '',
      score: 0,
    },
    {
      rank: 2,
      name: 'coco',
      colour: 'yellow',
      xo: 'o',
      status: '',
      score: 0,
    },
  ],
  setPlayers: () => {},
};
