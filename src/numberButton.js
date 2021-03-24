import React, { useState, useEffect } from "react";

export default function NumberButton(props) {
  const { number, addNumber, status, selectedButtons } = props;
  const [clicked, setClicked] = useState(false);
  const [Class, setClass] = useState(status);

  // useEffect(() => {
  //   const found = selectedButtons.find((element) => (element = number));
  //   console.log(found);
  //   if (found) {
  //     setClass(status);
  //   }
  // }, [selectedButtons, number, status]);

  useEffect(() => {
    const found = selectedButtons.find((element) => element === number);
    if (number === found) {
      setClass(status);
    }
  }, [number, selectedButtons, status]);

  function onClick() {
    setClicked(!clicked);
    if (!clicked) {
      setClass("candidato");
    } else {
      setClass("number");
    }
    addNumber(number);
    setClass(status);
  }

  return (
    <button className={Class} onClick={() => onClick()}>
      {number}
    </button>
  );
}
