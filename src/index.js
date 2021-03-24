import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import reportWebVitals from "./reportWebVitals";
import "./main.css";
import Star from "./star";
import NumberButton from "./numberButton";

const IniciarPartida = () => {
  const [stars, setStars] = useState([]);
  const [sum, setSum] = useState([]);
  const [max, setMax] = useState();
  const [status, setStatus] = useState("number");

  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const random = utils.Random(1, 9);
    setMax(random);
    for (let index = 0; index < random; index++) {
      setStars((oldArray) => [...oldArray, "*"]);
    }
  }, []);

  useEffect(() => {
    let suma = 0;
    sum.map((number) => {
      suma += number;
    });
    if (suma > max) {
      setStatus("malo");
    } else if (suma === max) {
      setStatus("usado");
    }
  }, [sum, max]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  function renderStars(index) {
    return <Star key={`star-${index}`} />;
  }

  function addNumber(number) {
    setSum((oldArray) => [...oldArray, number]);
  }

  return (
    <div className="game">
      <div className="help">
        Seleccione uno o más numeros que sumen el total de estrellas.
      </div>
      <div className="body">
        <div className="left">
          {stars.map((star, index) => {
            return renderStars(index);
          })}
        </div>
        <div className="right">
          <NumberButton
            number={1}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
          <NumberButton
            number={2}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
          <NumberButton
            number={3}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
          <NumberButton
            number={4}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
          <NumberButton
            number={5}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
          <NumberButton
            number={6}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
          <NumberButton
            number={7}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
          <NumberButton
            number={8}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
          <NumberButton
            number={9}
            addNumber={addNumber}
            status={status}
            selectedButtons={sum}
          />
        </div>
      </div>
      <div className="timer">Tiempo restante: {timer}</div>
    </div>
  );
};

// Color Theme
// const colores = {
//   disponible: "lightgray",
//   usado: "lightgreen",
//   malo: "lightcoral",
//   candidato: "deepskyblue",
// };

// Calculos
const utils = {
  // Suma el total de un arreglo
  Suma: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

  // Crea un arreglo de Numero entre un minimo y un maximo (include los limintes)
  Rango: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // selecciona un numero random entre un min y max (include los limintes)
  Random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Dado un arreglo de numeros y un maximo
  // Selecciona una suma random del set de todos los numeros disponibles en un arreglo
  SumaAleatoria: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidatosSet = sets[j].concat(arr[i]);
        const candidatosSum = utils.Suma(candidatosSet);
        if (candidatosSum <= max) {
          sets.push(candidatosSet);
          sums.push(candidatosSum);
        }
      }
    }
    return sums[utils.Random(0, sums.length - 1)];
  },
};

ReactDOM.render(<IniciarPartida />, document.getElementById("root"));

reportWebVitals();
