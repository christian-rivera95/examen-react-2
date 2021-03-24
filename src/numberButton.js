import React, { useState, useEffect } from "react";

export default function NumberButton(props) {
  const { number, addNumber, status, selectedButtons } = props;
  const [clicked, setClicked] = useState(false);
  const [Class, setClass] = useState(status);

  useEffect(() => {
    const found = selectedButtons.find((element) => element === number);
    if (number === found) {
      setClass(status);
    }
  }, [number, selectedButtons, status]);

  useEffect(() => {
    const found = selectedButtons.find((element) => element === number);
    if (clicked && found) {
      setClass("candidato");
    } else {
      setClass("number");
    }
  }, [clicked, number, selectedButtons]);

  useEffect(() => {
    console.log(clicked);
  }, [clicked]);

  function onClick() {
    addNumber(number);
    setClicked(!clicked);
  }

  return (
    <button className={Class} onClick={() => onClick()}>
      {number}
    </button>
  );
}
