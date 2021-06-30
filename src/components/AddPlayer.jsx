import React, { useState } from "react";
import { PropTypes } from "prop-types";

const AddPlayer = () => {
  const [player, setPlayer] = useState({ name: "", color: "" });
  function handleOnChange(event) {
    const { value } = event.target;
    setPlayer((prevPlayer) => {
      return { ...prevPlayer, name: value };
    });
  }
  return (
    <form>
      <input
        type="text"
        placeholder="Enter name"
        value={player.name}
        onChange={handleOnChange}
      />
    </form>
  );
};

AddPlayer.propTypes = {
  name: PropTypes.string.isRequired
};

export default AddPlayer;
