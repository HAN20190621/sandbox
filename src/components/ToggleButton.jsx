import React, { useState } from "react";
import styled from "styled-components";

function ToggleButton(props) {
  const [sortAsc, setSortAsc] = useState(true);

  const Button = styled.button`
    background-color: black;
    color: ${sortAsc ? "white" : "grey"};
    opacity: ${sortAsc ? 1 : 0.7};
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
    // &:hover {
    //   background-color: lightblue;
    // }
  `;
  // https://www.youtube.com/watch?v=17AwVXg5lHk
  function ToggleButton() {
    props.xsort(!sortAsc);
    setSortAsc(!sortAsc);
  }

  return (
    <div className="button-toggle">
      <Button onClick={() => ToggleButton()}>{sortAsc ? "DESC" : "ASC"}</Button>
    </div>
  );
}

export default ToggleButton;
