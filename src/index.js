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
  const arrayOfButtons = utils.Rango(1, 9);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [usados] = useState([]);

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
      setTimeout(() => nuevo(), 500);
    } else if (suma < max) {
      setStatus("candidato");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        eraseNumber={eraseNumber}
        status={status}
        selectedButtons={sum}
        usados={usados}
      />
    );
  }

  function addNumber(number) {
    setSum((oldArray) => [...oldArray, number]);
  }

  function eraseNumber(number) {
    setSum(sum.filter((c) => c !== number));
    console.log("borrando");
  }

  function nuevo() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let x = 0; x < sum.length; x++) {
      usados.push(sum[x]);
    }
    for (let x = 0; x < usados.length; x++) {
      arr = arr.filter((c) => c !== usados[x]);
    }
    const newRandom = utils.SumaAleatoria(arr, 9);
    setMax(newRandom);
    setSum([]);
    if (usados.length === 9) {
      setGameWon(true);
    }
  }

  useEffect(() => {
    setStars([]);
    for (let x = 0; x < max; x++) {
      setStars((oldArray) => [...oldArray, 1]);
    }
  }, [max]);

  return (
    <div className="game">
      <div className="help">
        Seleccione uno o más numeros que sumen el total de estrellas.
      </div>
      <div className="body">
        <div className="left">
          {gameWon ? (
            <h1 className="won-game">
              Bien! <br />
              <button onClick={() => restartGame()}>Jugar de nuevo</button>
            </h1>
          ) : !gameOver ? (
            stars.map((star, index) => {
              return renderStars(index);
            })
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
