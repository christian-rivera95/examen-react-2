import React, { useState, useEffect } from "react";

export default function NumberButton(props) {
  const {
    number,
    addNumber,
    status,
    selectedButtons,
    usados,
    eraseNumber,
  } = props;
  const [clicked, setClicked] = useState(false);
  const [Class, setClass] = useState("number");

  useEffect(() => {
    const usado = usados.find((element) => element === number);
    if (number === usado) {
      setClass("usado");
    }

    const found = selectedButtons.find((element) => element === number);
    if (number === found) {
      setClass(status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, selectedButtons, status, Class]);

  useEffect(() => {
    const found = selectedButtons.find((element) => element === number);
    if (clicked && found) {
      setClass("candidato");
    } else {
      setClass("number");
    }
  }, [clicked, number, selectedButtons]);

  function onClick() {
    if (Class !== "usado") {
      addNumber(number);
      setClicked(!clicked);
    }

    if (Class !== "number") {
      setClass("number");
    }
    if (clicked && Class !== "usado") {
      eraseNumber(number);
    }
  }

  return (
    <button className={Class} onClick={() => onClick()}>
      {number}
    </button>
  );
}
