import { useState } from "react";
import Die from "./Die.jsx";

function App() {
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const array = [];
    for (let i = 0; i < 5; i++) {
      const randNum = Math.floor(Math.random() * 6) + 1;
      array.push(randNum);
    }
    return array;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  const diceElements = dice.map(die => {
    return <Die value={die}/>
  })

  return (
    <main>
      <h1 className="title">Dicey Dice</h1>
      <p className="description">
        The greater the risk, the greater the score!
      </p>
      <div>Current Score:</div>
      <div>Total Score:</div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice-btn" onClick={rollDice}>Roll Dice</button>
    </main>
  );
}

export default App;
