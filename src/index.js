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
  const arrayOfButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const [timer, setTimer] = useState(15);

  useEffect(() => {
    const random = utils.Random(1, 9);
    setMax(random);
    for (let index = 0; index < random; index++) {
      setStars((oldArray) => [...oldArray, "*"]);
    }
  }, []);

  useEffect(() => {
    const suma = utils.Suma(sum);

    if (suma > max) {
      setStatus("malo");
    } else if (suma === max) {
      setStatus("usado");
    }
  }, [sum, max]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
      else setGameOver(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  function renderStars(index) {
    return <Star key={`star-${index}`} />;
  }

  function restartGame() {
    window.location.reload(false);
  }

  function renderNumberButton(index) {
    return (
      <NumberButton
        key={`number-${index}`}
        number={index}
        addNumber={addNumber}
        status={status}
        selectedButtons={sum}
      />
    );
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
          {!gameOver ? (
            stars.map((star, index) => {
              return renderStars(index);
            })
          ) : gameWon ? (
            <h1 className="won-game">
              Bien! <br />
              <button onClick={() => restartGame()}>Jugar de nuevo</button>
            </h1>
          ) : (
            <h1 className="game-over">
              Has perdido...{" "}
              <button onClick={() => restartGame()}>Jugar de nuevo</button>
            </h1>
          )}
        </div>
        <div className="right">
          {arrayOfButtons.map((button) => {
            return renderNumberButton(button);
          })}
        </div>
      </div>
      <div className="timer">Tiempo restante: {timer}</div>
    </div>
  );
};

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
